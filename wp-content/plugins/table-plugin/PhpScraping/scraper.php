<?php

require 'vendor/autoload.php';

use Goutte\Client;

// Helper to build FIDE rating URLs
function buildFideUrl($params = []) {
    $defaults = [
        'continent' => '',
        'country' => 'LTU',
        'rating' => '',
        'gender' => '',
        'age1' => '',
        'age2' => '',
        'period' => '',
        'period2' => ''
    ];
    $query = array_merge($defaults, $params);
    return "https://ratings.fide.com/a_top_var.php?" . http_build_query($query);
}

function startScraper()
{
    $client = new Client();
    // Set X-Requested-With header for all requests
    $client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');

    $urls = [
        "men" => buildFideUrl(['gender' => 'M']),
        "female" => buildFideUrl(['gender' => 'F']),
        "general" => buildFideUrl(),
        "youthU18" => buildFideUrl(['age2' => '18']),
        "youthU14" => buildFideUrl(['age2' => '14']),
        "youthU10" => buildFideUrl(['age2' => '10']),
        "s50" => buildFideUrl(['age1' => '50']),
        "s65" => buildFideUrl(['age1' => '65'])
    ];

    $data = [];

    foreach ($urls as $key => $url) {
        $crawler = $client->request('GET', $url);
        $counter = 0; // Initialize the counter

        $pageData = $crawler->filter('table tr')->each(function ($row) use (&$counter) {
            if ($counter >= 20) {
                return null; // Break out of the loop if the limit is reached
            }

            $tdElements = $row->filter('td');

            if ($tdElements->count() >= 6) {
                $nr = $tdElements->eq(0)->text();
                $playerTitle = $tdElements->eq(2)->text();
                $playerNameHtml = $tdElements->eq(1)->html(); // Get the HTML link
                $playerRating = $tdElements->eq(4)->text();

                $counter++; // Increment the counter

                return [
                    'nr' => $nr,
                    'playerName' => $playerNameHtml,
                    'playerTitle' => $playerTitle,
                    'playerRating' => $playerRating
                ];
            }

            return null;
        });

        $pageData = array_filter($pageData);

        $data[$key] = $pageData;
    }

    $formattedData = [];

    foreach ($data as $key => $players) {
        $formattedData[$key] = [];

        foreach ($players as $player) {
            $formattedData[$key][] = [
                'nr' => $player['nr'],
                'playerName' => $player['playerName'],
                'playerTitle' => $player['playerTitle'],
                'playerRating' => $player['playerRating']
            ];
        }
    }

    file_put_contents('data.json', json_encode($formattedData, JSON_PRETTY_PRINT));
    echo "The data has been scraped and saved successfully! View it at './data.json'\n";
}

startScraper();