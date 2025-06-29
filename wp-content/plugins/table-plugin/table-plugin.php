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

// Register the script on init
function register_my_table_plugin_scripts() {
    wp_register_script(
        'rating-table-plugin-script',
        plugin_dir_url(__FILE__) . 'src/ratingsTable.js',
        array(),
        '1.0',
        true
    );
    if (function_exists('wp_script_add_data')) {
        wp_script_add_data('rating-table-plugin-script', 'type', 'module');
    }
}
add_action('init', 'register_my_table_plugin_scripts');

// Enqueue only if block is present on a singular page
function enqueue_rating_table_plugin_script() {
    if (is_singular() && has_block('create-block/table-plugin')) {
        wp_enqueue_script('rating-table-plugin-script');
    }
}
add_action('wp_enqueue_scripts', 'enqueue_rating_table_plugin_script');

// Enqueue ratingsTable.js in the block editor as well
function enqueue_rating_table_plugin_editor_script() {
    wp_enqueue_script(
        'rating-table-plugin-script',
        plugin_dir_url(__FILE__) . 'src/ratingsTable.js',
        array(),
        '1.0',
        true
    );
    if (function_exists('wp_script_add_data')) {
        wp_script_add_data('rating-table-plugin-script', 'type', 'module');
    }
}
add_action('enqueue_block_editor_assets', 'enqueue_rating_table_plugin_editor_script');

// Render only the container for the ratings table
function render_chess_ratings_block($attributes)
{
    $showButtons = isset($attributes['showButtons']) ? $attributes['showButtons'] : true;
    $category = isset($attributes['category']) ? $attributes['category'] : 'general';
    $html = '<div id="ratings-table-container" class="table-button-wrapper" data-category="' . esc_attr($category) . '" data-show-buttons="' . ($showButtons ? '1' : '0') . '"></div>';
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
                'default' => true,
            ),
        ),
        'render_callback' => 'render_chess_ratings_block',
    ));
}
add_action('init', 'create_block_table_plugin_block_init');
