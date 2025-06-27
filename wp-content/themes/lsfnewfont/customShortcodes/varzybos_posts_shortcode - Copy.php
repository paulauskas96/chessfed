<?php
function varzybos_posts_shortcode($atts)
{
  $atts = shortcode_atts(array(
    'limit' => 9, // Change this number to control the number of posts displayed
    'pagination' => 'no',
  ), $atts);

  // Get the current date
  $current_date = date('Y-m-d');

  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

  // Query the posts from the 'varzybos' custom post type
  $args = array(
    'post_type' => 'varzybos',
    'posts_per_page' => $atts['limit'],
    'paged' => $paged,
    'meta_key' => 'varzybu_data_iki',
    'orderby' => 'meta_value',
    'order' => 'ASC',
    'meta_query' => array(
      array(
        'key' => 'varzybu_data_iki',
        'value' => $current_date,
        'compare' => '>=', // Show events that start on or after the current date
        'type' => 'DATE',
      ),
    ),
  );
  $query = new WP_Query($args);

  // Check if there are posts
  if ($query->have_posts()) {
    $output = '<div class="varzybu-list">'; // Opening div for the list
    while ($query->have_posts()) {
      $query->the_post();
      $post_url = get_permalink(($query->ID));
      $output .= '<div class="turnyro-card">';
      $output .= '<div class="turnyro-info-wrapper">';
      $output .= '<a href=' . $post_url . '>';
      $output .= '<h3 class="turnyro-title underline">' . get_the_title() . '</h3>';
      $output .= '</a>';

      // Get the custom field values
      $varzybu_data = get_post_meta(get_the_ID(), 'varzybu_data', true);
      $varzybu_pabaiga = get_post_meta(get_the_ID(), 'varzybu_data_iki', true);
      $turnyro_stilius = get_post_meta(get_the_ID(), 'sachmatu_tipas', true);
      $turnyro_vieta = get_post_meta(get_the_ID(), 'varzybu_vieta', true);

      // Get the ACF field "Lietuvos mastu?" value
      $lietuvos_mastu = get_field('lietuvos_mastu');
      $kiek_dienu = get_field('kiek_dienu');

      // Format the date strings
      $varzybu_data_formatted = date('Y-m-d', strtotime($varzybu_data));
      $varzybu_pabaiga_formatted = date('Y-m-d', strtotime($varzybu_pabaiga));

      // Format the turnyro tipas
      $turnyro_stilius_formatted = str_replace(
        array('ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž', 'Ą', 'Č', 'Ę', 'Ė', 'Į', 'Š', 'Ų', 'Ū', 'Ž'),
        array('a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z', 'a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z'),
        $turnyro_stilius
      );
      $turnyro_stilius_formatted = mb_strtolower($turnyro_stilius_formatted);

      // reikia dar sutvarkyti jeigu lietuvos mastu true tai rodyti abidvi datas nuo ir iki. Dar reikia sudeti css (red, blue ir svg icon)
      // Display the custom field values
      $output .= '<ul class="turnyro-info">';

      if ($kiek_dienu == true) {
        $output .= '<li class="turnyro-data">Nuo ' . $varzybu_data_formatted . ' iki ' . $varzybu_pabaiga_formatted . '</li>';
      }
      if ($kiek_dienu == false) {
        $output .= '<li class="turnyro-data">' . $varzybu_data_formatted . '</li>';
      }

      // Check if "Lietuvos mastu?" is true
      if ($lietuvos_mastu) {
        // Add a class to change the color to red
        $output .= '<li class="turnyro-tipas red ' . $turnyro_stilius_formatted . '">' . $turnyro_stilius . '</li>';
      } else {
        // Add a class to change the color to blue
        $output .= '<li class="turnyro-tipas blue ' . $turnyro_stilius_formatted . '">' . $turnyro_stilius . '</li>';
      }
      $output .= '<li class="turnyro-vieta">' . $turnyro_vieta . '</li>';
      $output .= '</ul>';
      $output .= '</div>';

      $output .= '</div>';
    }
    $output .= '</div>'; // Closing div for the list
  } else {
    $output = 'Artimiausiu metu varžybų nėra.';
  }

  if ($atts['pagination'] === 'yes') {
    $output .= paginate_links(array(
      'total' => $query->max_num_pages,
    ));
  }
  // Restore original post data
  wp_reset_postdata();

  return $output;
}
add_shortcode('varzybos_posts', 'varzybos_posts_shortcode');

