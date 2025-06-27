<?php

/*
Enqueue Styles
*/

if (!function_exists('fse_rad')) :
  function fse_rad()
  {
    wp_enqueue_style('rad-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
  }

endif;
add_action('wp_enqueue_scripts', 'fse_rad');

function enqueue_custom_script() {
  wp_enqueue_script('custom-script', get_template_directory_uri() . '/customJs/noReload.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_custom_script');

//kad veiktu custom functions
require_once get_template_directory() . '/customFunctions/custom_functions.php';

//sukurti shortcode visom varzybos 
require_once get_template_directory() . '/customShortcodes/varzybos_posts_shortcode.php';

//create short code for online turnyrai custom post type 
require_once get_template_directory() . '/customShortcodes/online_varzybos_shortcode.php';

//create short code for the buttons to link to the respective page (greitai, ivyko, vyksta)  
require_once get_template_directory() . '/customShortcodes/display_events.php';

// create short code for the competition columns (greitai, ivyko, vyksta)
require_once get_template_directory() . '/customShortcodes/display_competition_columns.php';


function search_form_shortcode()
{
  return '
      <form role="search" method="get" class="d-flex" action="' . home_url('/') . '">
      <div class="search-input-wrapper">
       <button class="search-button">
       </button>
        <input class="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" value="' . get_search_query() . '" name="s" title="Search" />
      </div>
      </form>
  ';
}
add_shortcode('search_form', 'search_form_shortcode');

//header.php

function register_my_menu()
{
  register_nav_menu('header-menu', __('Header Menu'));
}
add_action('init', 'register_my_menu');

//sukurti varzybu post type wordpress admin dashborde

function create_competition_posttype()
{
  register_post_type(
    'varzybos',
    array(
      'labels' => array(
        'name' => __('Varzybos'),
        'singular_name' => __('Varzybos')
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'varzybos'),
      'show_in_rest' => true,
      'supports' => array('title', 'editor', 'thumbnail') // Add thumbnail support
    )
  );
}
add_action('init', 'create_competition_posttype');

//sukurti online varzybos post type wordpress admin dashborde

function create_online_turnyrai_posttype()
{
  register_post_type(
    'online_turnyrai',
    array(
      'labels' => array(
        'name' => __('Online Turnyrai'),
        'singular_name' => __('Online Turnyrai')
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'online_turnyrai'),
      'show_in_rest' => true,
      'supports' => array('title', 'editor', 'thumbnail') // Add thumbnail support
    )
  );
}
add_action('init', 'create_online_turnyrai_posttype');

function enqueue_show_hide_tables_script()
{
  wp_enqueue_script(
    'show-hide-tables',
    get_stylesheet_directory_uri() . '/show-hide-tables.js',
    array(),
    false,
    true
  );
}
add_action('wp_enqueue_scripts', 'enqueue_show_hide_tables_script');

// configurate rest api and get acf date field

function register_acf_fields_with_rest_api()
{
  register_rest_field(
    'varzybos',
    'date',
    array(
      'get_callback' => 'get_acf_date',
      'update_callback' => null,
      'schema' => null,
    )
  );
}
add_action('init', 'register_acf_fields_with_rest_api');

function get_acf_date($object, $field_name, $request)
{
  return get_post_meta($object['id'], $field_name, true);
}
