<?php

require 'vendor/autoload.php';

use Goutte\Client;

function startScraper()
{
    $client = new Client();
    // Set X-Requested-With header for all requests
    $client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');

    $urls = [
        "men" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=M&age1=&age2=&period=&period2=",
        "men" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=M&age1=&age2=&period=&period2=",
        "female" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=F&age1=&age2=&period=&period2=",
        "general" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=&period=&period2=",
        "youthU18" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=18&period=&period2=",
        "youthU14" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=14&period=&period2=",
        "youthU10" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=10&period=&period2=",
        "senior" => "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=50&age2=&period=&period2="
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