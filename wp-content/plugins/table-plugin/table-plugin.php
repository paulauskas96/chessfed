<?php

/**
 * Plugin Name:       Table Plugin
 * Description:       Tai yra reitingu lentele, palei ratings.fide
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       table-plugin
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


//adding btnFunctionality.js to the server-side php code
function enqueue_my_frontend_script() {
   if (is_front_page()) {
       wp_enqueue_script(
           'my-frontend-script', // Unique handle for your script
           plugin_dir_url(__FILE__) . 'src/btnFunctionality.js', // URL to the script file
           array(), // Array of scripts that your script depends on
           '1.0', // Version number
           true // Whether to enqueue the script in the footer
       );
   }
}
add_action('wp_enqueue_scripts', 'enqueue_my_frontend_script');

//rendering static html using server-side php code

function render_chess_ratings_block($attributes)
{
	// Load the data from the JSON file.
	$dataPath = __DIR__ . '/PhpScraping/data.json';
	$data = json_decode(file_get_contents($dataPath), true);

	// Get the category from the block attributes.
	$category = $attributes['category'];

	// Get the data for the current category.
	$tableData = $data[$category];

	// Generate the HTML for the table.
	$html = '<div class="table-button-wrapper">';
	if ($attributes['showButtons']) {
		$html .= '<div class="button-wrapper">';
		$html .= '<button data-category="general" class="table-btn">Bendras</button>';
		$html .= '<button data-category="men" class="table-btn">Vyrai</button>';
		$html .= '<button data-category="female" class="table-btn">Moterys</button>';
		$html .= '<button data-category="youthU18" class="table-btn youth">Jauniai</button>';
		$html .= '<div class="youth-btn-wrapper">';
		$html .= '<button data-category="youthU18" class="table-btn U18">U18</button>';
		$html .= '<button data-category="youthU14" class="table-btn">U14</button>';
		$html .= '<button data-category="youthU10" class="table-btn">U10</button>';
		$html .= '</div>';
		$html .= '<button data-category="s50" class="table-btn senior">Senjorai</button>';
		$html .= '<div class="senior-btn-wrapper">';
		$html .= '<button data-category="s50" class="table-btn S50">S50</button>';
		$html .= '<button data-category="s65" class="table-btn S65">S65</button>';
		$html .= '</div>';
		$html .= '</div>';
		// cia yra mobile responsive meniu
		$html .= '<select id="category-select" class="table-select">';
		$html .= '<option value="general">Bendras</option>';
		$html .= '<option value="men">Vyrai</option>';
		$html .= '<option value="female">Moterys</option>';

		$html .= '<optgroup label="Jauniai">';
		$youthCategories = array(
			"youthU18" => "U18",
			"youthU14" => "U14",
			"youthU10" => "U10"
		);
		foreach ($youthCategories as $value => $label) {
			$html .= '<option value="' . $value . '">' . $label . '</option>';
		}
		$html .= '</optgroup>';

		$html .= '<optgroup label="Senjorai">';
		$seniorCategories = array(
			"s50" => "S50",
			"s65" => "S65"
		);
		foreach ($seniorCategories as $value => $label) {
			$html .= '<option value="' . $value . '">' . $label . '</option>';
		}
		$html .= '</optgroup>';

		$html .= '</select>';
	}
	$html .= '<div class="table-wrapper">';
	if (!$attributes['showButtons']) {
		$html .= '<h3 class="table-title">Reitingo lyderiai</h3>';
	}
	$html .= '<table class="rating-table">';
	$html .= '<thead>';
	$html .= '<tr class="table-heading">';
	$html .= '<th>Nr.</th>';
	if ($attributes['showButtons']) {
		$html .= '<th>Titulas</th>';
	}
	$html .= '<th>Žaidėjas</th>';
	$html .= '<th>Reitingas</th>';
	$html .= '</tr>';
	$html .= '</thead>';
	$html .= '<tbody class="table-body">';
	// Load nameMap.json for diacritic replacements
	$nameMapPath = __DIR__ . '/src/nameMap.json';
	$nameMap = [];
	if (file_exists($nameMapPath)) {
		$nameMap = json_decode(file_get_contents($nameMapPath), true);
	}

	foreach ($tableData as $row) {
		$html .= '<tr class="table-info">';
		$html .= '<td class="nr">' . $row['nr'] . '</td>';
		$html .= '<td class="playerTitle">' . $row['playerTitle'] . '</td>';

		// Format hyperlink text like in edit.js, but keep the hyperlink
		$playerNameHtml = $row['playerName'];
		$dom = new DOMDocument;
		$dom->loadHTML($playerNameHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$links = $dom->getElementsByTagName('a');
		if ($links->length > 0) {
			$href = $links->item(0)->getAttribute('href');
			// Add the prefix to the href attribute
			$href = 'https://ratings.fide.com/' . ltrim($href, '/');
			$linkText = $links->item(0)->nodeValue;
			// Format link text as in edit.js
			$text = strip_tags($linkText);
			$parts = explode(',', $text);
			if (count($parts) === 2) {
				$surname = trim($parts[0]);
				$name = trim($parts[1]);
				$fullKey = $name . ' ' . $surname;
				if (isset($nameMap[$fullKey])) {
					$displayName = $nameMap[$fullKey];
				} else {
					$displayName = $fullKey;
				}
			} else {
				$displayName = $text;
			}
			$playerName = '<a href="' . $href . '" target="_blank">' . htmlspecialchars($displayName) . '</a>';
		} else {
			// No link, just format as in edit.js
			$text = strip_tags($playerNameHtml);
			$parts = explode(',', $text);
			if (count($parts) === 2) {
				$surname = trim($parts[0]);
				$name = trim($parts[1]);
				$fullKey = $name . ' ' . $surname;
				if (isset($nameMap[$fullKey])) {
					$displayName = $nameMap[$fullKey];
				} else {
					$displayName = $fullKey;
				}
			} else {
				$displayName = $text;
			}
			$playerName = htmlspecialchars($displayName);
		}

		$html .= '<td class="playerName underline">' . $playerName . '</td>';
		$html .= '<td class="playerRating">' . $row['playerRating'] . '</td>';
		$html .= '</tr>';
	}
	$html .= '</tbody>';
	$html .= '</table>';
	$html .= '</div>';
	$html .= '</div>';

	return $html;
}
// cia yra registruojama lentele kaip block, kad galetume naudoti editor'iuje
function create_block_table_plugin_block_init()
{
	register_block_type(__DIR__ . '/build', array(
		'attributes' => array(
			'category' => array(
				'type' => 'string',
				'default' => 'general',
			),
			'showButtons' => array(
				'type' => 'boolean',
				'default' => 'true',
			),

		),
		'render_callback' => 'render_chess_ratings_block',
	));
}
add_action('init', 'create_block_table_plugin_block_init');
