<?php

/**
 * Plugin Name:       Cempionatu Lentele
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cempionatu-lentele
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function my_block_editor_assets()
{
    // Enqueue the DataTables Responsive extension CSS and JavaScript files
    wp_enqueue_style('global-style', plugin_dir_url(__FILE__) . 'DataTables/css/globalStyle.css');
 wp_enqueue_style('datatables-responsive', plugin_dir_url(__FILE__) . 'DataTables/css/responsive.dataTables.min.css');
 wp_enqueue_script('datatables-responsive', plugin_dir_url(__FILE__) . 'DataTables/js/dataTables.responsive.min.js', array('datatables'), null, true);
}
add_action('wp_enqueue_scripts', 'my_block_editor_assets');


function cempionatu_lentele_cempionatu_lentele_block_init()
{
    register_block_type(__DIR__ . '/build/stdyouth');
    register_block_type(__DIR__ . '/build/rapidblitzyth');
    register_block_type(__DIR__ . '/build/stdadult');
    register_block_type(__DIR__ . '/build/rapidblitzadult');
    register_block_type(__DIR__ . '/build/teamstdadult');
    register_block_type(__DIR__ . '/build/TeamRapidBlitzAdult');
    register_block_type(__DIR__ . '/build/TeamYouth');
}
add_action('init', 'cempionatu_lentele_cempionatu_lentele_block_init');

add_action('rest_api_init', function () {
    register_rest_route('sample/v1', '/data/', array(
        'methods' => 'GET',
        'callback' => 'sample_get_data',
        'permission_callback' => 'sample_get_data_permissions_check',
    ));
});

function sample_get_data(WP_REST_Request $request)
{
    $page = $request->get_param('page');
    $per_page = $request->get_param('per_page');

    // Get the contents of the JSON file
    // $json = file_get_contents(plugin_dir_path(__FILE__) . 'sample-copy.json');
	 $json = file_get_contents(plugin_dir_path(__FILE__) . 'LSF_varzybu_istorija.json');
    $data = json_decode($json, true);

    // Calculate the offset based on the page and per_page parameters
    $offset = ($page - 1) * $per_page;

    // Slice the data array to get the data for the current page
    $data = array_slice($data, $offset, $per_page);

    return $data;
}
// function sample_get_data() {
//     // Get the contents of the JSON file
//     // $json = file_get_contents( plugin_dir_path( __FILE__ ) . 'sample.json' );
//     $json = file_get_contents( plugin_dir_path( __FILE__ ) . 'sample-copy.json' );
//     return json_decode( $json );
// }

function sample_get_data_permissions_check()
{
    // Restrict endpoint to only users who have the edit_posts capability.
    // if ( ! current_user_can( 'edit_posts' ) ) {
    //     return new WP_Error( 'rest_forbidden', 'You do not have permission to view this data.', array( 'status' => 401 ) );
    // }
    // If the user has the necessary permissions, allow access to the endpoint.
    return true;
}
