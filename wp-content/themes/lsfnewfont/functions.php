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

// kad veiktu jquery
function enqueue_jquery()
{
  wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'enqueue_jquery');

function enqueue_datatables()
{
  wp_enqueue_script('datatables', 'https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js', array('jquery'), '1.10.25', true);
}
add_action('wp_enqueue_scripts', 'enqueue_datatables');

function enqueue_datatables_css()
{
  wp_enqueue_style('datatables', 'https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css', array(), '1.10.25');
}
add_action('wp_enqueue_scripts', 'enqueue_datatables_css');

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

// error_reporting(E_ALL & ~E_WARNING);

function enqueue_custom_script()
{
  wp_enqueue_script(
    'custom-search-bar',
    get_template_directory_uri() . '/customJs/searchBar.js',
    array('jquery'),
    '1.0',
    true
  );
}
add_action('wp_enqueue_scripts', 'enqueue_custom_script');

function enqueue_custom_scripts_featured()
{
  $request_uri = $_SERVER['REQUEST_URI'];

  if (strpos($request_uri, '/naujienos') === 0) {
    wp_enqueue_script('featured-image', get_template_directory_uri() . '/customJs/featured-image.js', array('jquery'), '1.0', true);
  }
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_featured');

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
      'supports' => array('title', 'editor', 'thumbnail') // Add thumbnail support,
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

function wpse_19040_notify_admin_on_publish($new_status, $old_status, $post)
{
  if ($new_status !== 'publish' || $old_status === 'publish' || $post->post_type !== 'post')
    return;
  if (!$post_type = get_post_type_object($post->post_type))
    return;

  // Recipient, in this case the administrator email
  $emailto = get_option('admin_email');

  // Email subject, "New {post_type_label}"
  $subject = 'New ' . $post_type->labels->singular_name;

  // Email body
  $message = 'View it: ' . get_permalink($post->ID) . "\nEdit it: " . get_edit_post_link($post->ID);

  /* AP: removed
  wp_mail($emailto, $subject, $message);*/
}

add_action('transition_post_status', 'wpse_19040_notify_admin_on_publish', 10, 3);

function replace_menu_item_with_shortcode($items)
{
  foreach ($items as $item) {
    if (in_array('mega-searchPlaceholder', $item->classes)) { // check if the menu item has the class 'mega-searchPlaceholder'
      $item->title = do_shortcode('[ivory-search id="1514" title="AJAX Search Form"]');
    }
  }
  return $items;
}
add_filter('wp_nav_menu_objects', 'replace_menu_item_with_shortcode');

function exclude_media_from_search($search, $wp_query)
{
  if (!is_admin() && $wp_query->is_main_query() && $wp_query->is_search) {
    global $wpdb;

    // Exclude media content types (attachments)
    $search .= " AND {$wpdb->posts}.post_type NOT IN ('attachment') ";
  }
  return $search;
}
add_filter('posts_search', 'exclude_media_from_search', 10, 2);

// homepage naujienu shortcode

add_shortcode('query_loop', 'query_loop_func');
function query_loop_func()
{
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => 3,
  );

  $query = new WP_Query($args);

  $output = '<div class="post-list">';
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      $output .= '<div class="post-card box-shadow">';

      if (has_post_thumbnail()) {
        $output .= '<a class="post-img" href="' . get_permalink() . '"><img class="post-thumbnail" src="' . get_the_post_thumbnail_url() . '" alt="' . get_the_title() . '"></a>';
      } else {
        // If there is no featured image, use a placeholder.
        $output .= '<a class="post-img" href="' . get_permalink() . '"><img class="post-thumbnail" src="' . get_site_url() . '/wp-content/uploads/naujienos-foto-300x189-1.png" alt="Placeholder"></a>';
      }

      $output .= '<div class="post-info-wrapper">';

      $output .= '<span class="post-date">' . get_the_date('Y-m-d') . '</span>';
      $output .= '<ul class="post-info">';

      $output .= '<li class="post-title underline">' . '<a class="has-md-r-font-size" href="' . get_permalink() . '">' . get_the_title() . '</a>' . '</li>';


      $output .= '<li class="read-more-wrapper">' . '<a class="read-more read-more-green" href="' . get_permalink() . '">Skaityti naujieną';

      $output .= '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">';
      $output .= '<path d="M12.3583 9.40825L8.82501 5.87492C8.74754 5.79681 8.65538 5.73481 8.55383 5.69251C8.45228 5.65020 8.34336 5.62842 8.23335 5.62842C8.12334 5.62842 8.01442 5.65020 7.91287 5.69251C7.81132 5.73481 7.71915 5.79681 7.64168 5.87492C7.48647 6.03105 7.39935 6.24226 7.39935 6.46242C7.39935 6.68257 7.48647 6.89378 7.64168 7.04992L10.5917 9.99992L7.64168 12.9499C7.48647 13.1061 7.39935 13.3173 7.39935 13.5374C7.39935 13.7576 7.48647 13.9688 7.64168 14.1249C7.71955 14.2022 7.81189 14.2633 7.91342 14.3047C8.01496 14.3462 8.12367 14.3672 8.23335 14.3666C8.34302 14.3672 8.45174 14.3462 8.55327 14.3047C8.6548 14.2633 8.74715 14.2022 8.82501 14.1249L12.3583 10.5916C12.4365 10.5141 12.4984 10.4219 12.5408 10.3204C12.5831 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.5831 9.78099 12.5408 9.67944C12.4984 9.57789 12.4365 9.48572 12.3583 9.40825Z"/>';
      $output .= '</svg>';
      $output .= '</a>';
      $output .= '</li>';
      $output .= '</ul>';
      // End of post-info-wrapper div
      $output .= '</div>';

      // End of post-card div
      $output .= '</div>';
    }
    wp_reset_postdata();
  }

  $output .= '</div>';

  return $output;
}

// uzdeti placeholder image tiems postams kurie neturi featured image

function add_placeholder_image_1($block_content, $block)
{

  // Get the current request URI
  $request_uri = $_SERVER['REQUEST_URI'];

  // Check if the request URI starts with '/news'
  if (strpos($request_uri, '/naujienos') === 0) {
    // Check if the block is a Featured Image block
    if ($block['blockName'] !== 'core/post-featured-image') {
      return $block_content;
    }

    // Get the post ID from the block's attributes
    $post_id = $block['attrs']['postId'] ?? 0;

    // Check if the post has a featured image
    if (has_post_thumbnail($post_id)) {
      return $block_content;
    }

    // If the post doesn't have a featured image, return a new Image block with the placeholder image
    return '<a class="post-img" href="#"><img class="post-thumbnail" src="' . get_site_url() . '/wp-content/uploads/naujienos-foto-300x189-1.png" alt="Placeholder Image"></a>';
  } else {
    return $block_content;
  }
}
add_filter('render_block', 'add_placeholder_image_1', 10, 2);

function current_year_shortcode()
{
  return date('Y');
}
add_shortcode('current_year', 'current_year_shortcode');

add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/upcoming-events', array(
    'methods' => 'GET',
    'callback' => 'get_upcoming_events',
  ));
});

