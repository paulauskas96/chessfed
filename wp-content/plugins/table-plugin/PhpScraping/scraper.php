<?php

require 'vendor/autoload.php';

use Goutte\Client;

// Helper to build FIDE rating URLs for different types
function buildFideUrl($params = [], $type = 'standard') {
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
    // Add type parameter for rapid/blitz
    if ($type === 'rapid') {
        $query['rating'] = 'rapid';
    } elseif ($type === 'blitz') {
        $query['rating'] = 'blitz';
    }
    return "https://ratings.fide.com/a_top_var.php?" . http_build_query($query);
}

function startScraper()
{
    $client = new Client();
    $client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');

    $types = ['standard', 'rapid', 'blitz'];
    $categories = [
        "men" => ['gender' => 'M'],
        "female" => ['gender' => 'F'],
        "general" => [],
        "youthU18" => ['age2' => '18'],
        "youthU14" => ['age2' => '14'],
        "youthU10" => ['age2' => '10'],
        "s50" => ['age1' => '50'],
        "s65" => ['age1' => '65']
    ];

    $allData = [];

    foreach ($types as $type) {
        $data = [];
        foreach ($categories as $key => $params) {
            $url = buildFideUrl($params, $type);
            $crawler = $client->request('GET', $url);
            $counter = 0;
            $pageData = $crawler->filter('table tr')->each(function ($row) use (&$counter) {
                if ($counter >= 100) {
                    return null;
                }
                $tdElements = $row->filter('td');
                if ($tdElements->count() >= 5) {
                    // Detect if title column exists (6 columns) or not (5 columns)
                    $hasTitle = $tdElements->count() >= 6;
                    
                    $nr = $tdElements->eq(0)->text();
                    $playerTitle = $hasTitle ? $tdElements->eq(2)->text() : '';
                    $playerNameHtml = $tdElements->eq(1)->html();
                    $ratingIdx = $hasTitle ? 4 : 3;
                    
                    $playerRating = $tdElements->eq($ratingIdx)->text();
                    
                    $counter++;
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
            $data[$key] = array_values($pageData);
        }
        $allData[$type] = $data;
    }

    file_put_contents('data.json', json_encode($allData, JSON_PRETTY_PRINT));
    echo "The data has been scraped and saved successfully! View it at './data.json'\n";
}

startScraper();