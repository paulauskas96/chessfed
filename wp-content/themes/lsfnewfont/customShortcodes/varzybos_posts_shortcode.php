<?php
// cia yra pagrindiniame puslapyja po zemelapiu varzybu query loop

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
    /*'meta_key' => 'varzybu_data',
    'orderby' => 'meta_value',
    'order' => 'ASC',*/
	'orderby' => array('lietuvos_mastu' => 'DESC', 'varzybu_data' => 'ASC'),
    'meta_query' => array(
	  'relation' => 'AND',
	  array(
		  'relation' => 'OR',
		  'varzybu_data' => array(
			'key' => 'varzybu_data',
			'value' => $current_date,
			'compare' => '>=', // Show events that start on or after the current date
			'type' => 'DATE',
		  ),
		  'varzybu_data_iki' => array(
			'key' => 'varzybu_data_iki',
			'value' => $current_date,
			'compare' => '>=', // Show events that start on or after the current date
			'type' => 'DATE',
		  )
	  ),
	  'lietuvos_mastu' => array(
        'key' => 'lietuvos_mastu',
        'value' => array(0, 1),
        'compare' => 'EXISTS',
        'type' => 'NUMERIC',
      )
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
      $output .= '<a href="' . esc_url($post_url) . '">';
      $output .= '<h3 class="turnyro-title underline">' . esc_html(get_the_title()) . '</h3>';
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
      $turnyro_stilius_formatted = sanitize_html_class(mb_strtolower($turnyro_stilius_formatted));

      // reikia dar sutvarkyti jeigu lietuvos mastu true tai rodyti abidvi datas nuo ir iki. Dar reikia sudeti css (red, blue ir svg icon)
      // Display the custom field values
      $output .= '<ul class="turnyro-info">';

      if ($kiek_dienu == true) {
        $output .= '<li class="turnyro-data">Nuo ' . esc_html($varzybu_data_formatted) . ' iki ' . esc_html($varzybu_pabaiga_formatted) . '</li>';
      }
      if ($kiek_dienu == false) {
        $output .= '<li class="turnyro-data">' . esc_html($varzybu_data_formatted) . '</li>';
      }

      $color = $lietuvos_mastu ? 'red' : 'blue';
      $output .= '<li class="turnyro-tipas ' . $color . ' ' . esc_attr($turnyro_stilius_formatted) . '">' . esc_html($turnyro_stilius) . '</li>';
      $output .= '<li class="turnyro-vieta">' . esc_html($turnyro_vieta) . '</li>';
      $output .= '</ul>';
      $output .= '</div>';

      $output .= '</div>';
    }
    $output .= '</div>'; // Closing div for the list
  } else {
    $output = 'Artimiausiu metu varžybų nėra.';
  }

//   if ($atts['pagination'] === 'yes') {
//     $output .= paginate_links(array(
//       'total' => $query->max_num_pages,
//     ));
//   }
if ($atts['pagination'] === 'yes') {
 $pagination = paginate_links(array(
     'base' => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
     'format' => '?paged=%#%',
     'current' => max(1, get_query_var('paged')),
     'total' => $query->max_num_pages,
     'type' => 'list',
     'prev_text' => 'Previous',
     'next_text' => 'Next',
     'echo' => false,
 ));
 $pagination = str_replace('<br />', '', $pagination);
 $pagination = preg_replace('/<ul[^>]*>/i', '<ul class="custom-pagination">', $pagination);

 $output .= '<div class="pagination-wrapper">';
 $output .= $pagination;
 $output .= '</div>';
}


  // Restore original post data
  wp_reset_postdata();

  return $output;
}
add_shortcode('varzybos_posts', 'varzybos_posts_shortcode');
