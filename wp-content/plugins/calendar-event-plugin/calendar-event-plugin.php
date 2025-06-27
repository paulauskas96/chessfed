<?php

/**
 * Plugin Name:       Calendar Event Plugin
 * Description:      Custom plugin'as. Kalendorio ir zemelapio gutenebrg block'ui
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            OHQ Media
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       calendar-event-plugin
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
function calendar_event_plugin_calendar_event_plugin_block_init()
{
	register_block_type(__DIR__ . '/build/calendar');
	register_block_type(__DIR__ . '/build/map');
}
add_action('init', 'calendar_event_plugin_calendar_event_plugin_block_init');


function enqueue_tippy_styles() {
    wp_enqueue_style('tippy-css', plugins_url('/node_modules/tippy.js/dist/tippy.css', __FILE__));
    wp_enqueue_style('tippy-backdrop-css', plugins_url('/node_modules/tippy.js/dist/backdrop.css', __FILE__));
    wp_enqueue_style('tippy-shift-away-css', plugins_url('/node_modules/tippy.js/animations/shift-away.css', __FILE__));
    wp_enqueue_style('tippy-light-border-css', plugins_url('/node_modules/tippy.js/themes/light-border.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'enqueue_tippy_styles');

function enqueue_leaflet_styles() {
    wp_enqueue_style('leaflet-css', plugins_url('/node_modules/leaflet/dist/leaflet.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'enqueue_leaflet_styles');