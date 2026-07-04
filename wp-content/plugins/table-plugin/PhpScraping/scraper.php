<?php

header('Content-Type: text/plain; charset=utf-8');

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
    // Only include params that have a non-empty value
    $query = array_filter($query, fn($v) => $v !== '');
    return "https://ratings.fide.com/a_top_var.php?" . http_build_query($query);
}

// Used only for title lookup — a_top_var.php no longer returns the title column.
// Inactive status here is based on standard rating only, so players may appear
// even if inactive in rapid/blitz; do not use this as an authoritative rating source.
function scrapeTitles($client)
{
    $client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');
    $url = 'https://ratings.fide.com/incl_search_l.php?search_rating=all&search_country=LTU&search_title=all_g';
    $crawler = $client->request('GET', $url);

    $titleMap = [];
    $crawler->filter('td[data-label="FIDEID"]')->each(function ($fideTd) use (&$titleMap, $crawler) {
        // Each FIDEID cell's parent <tr> contains the title cell
        $row = $fideTd->closest('tr');
        if (!$row) return;
        $titleTd = $row->filter('td[data-label="title"]');
        if (!$titleTd->count()) return;

        $fideId = trim($fideTd->text());
        $titleText = trim($titleTd->text());
        // Take only the first title when multiple are listed (e.g. "GM WGM" → "GM")
        $parts = preg_split('/\s+/', $titleText, -1, PREG_SPLIT_NO_EMPTY);
        $title = $parts[0] ?? '';
        if ($fideId !== '' && $title !== '') {
            $titleMap[$fideId] = $title;
        }
    });

    return $titleMap;
}

function startScraper()
{
    $client = new Client();
    $client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');

    $titleMap = scrapeTitles($client);

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
            $pageData = $crawler->filter('table tr')->each(function ($row) use (&$counter, $titleMap) {
                if ($counter >= 100) {
                    return null;
                }
                $tdElements = $row->filter('td');
                if ($tdElements->count() >= 5) {
                    // Detect if title column exists (6 columns) or not (5 columns)
                    $hasTitle = $tdElements->count() >= 6;
                    
                    $nr = $tdElements->eq(0)->text();
                    $playerTitle = $hasTitle ? trim($tdElements->eq(2)->text()) : '';
                    $playerNameHtml = $tdElements->eq(1)->html();
                    $ratingIdx = $hasTitle ? 4 : 3;
                    
                    // Fallback: look up title by FIDE ID from the titles endpoint
                    if ($playerTitle === '') {
                        preg_match('/href=["\']?\/profile\/(\d+)["\']?/i', $playerNameHtml, $m);
                        $fideId = $m[1] ?? null;
                        $playerTitle = ($fideId && isset($titleMap[$fideId])) ? $titleMap[$fideId] : '';
                    }

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
            $resultCount = count($pageData);
            echo "Scraped url $url, $resultCount results\n";
            $data[$key] = array_values($pageData);
        }
        echo "\n";
        $allData[$type] = $data;
    }

    file_put_contents('data.json', json_encode($allData, JSON_PRETTY_PRINT));
    echo "The data has been scraped and saved successfully! View it at './data.json'\n";
}

startScraper();