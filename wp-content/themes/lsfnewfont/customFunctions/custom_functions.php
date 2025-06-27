<?php
// cia yra custom funkciju file get_sorted_varzybos_posts, get_page_by_title_custom


function get_sorted_varzybos_posts()
{
  // Get today's date
  $today = new DateTime();
  $today = $today->format('Y-m-d');

  // Query 'varzybos' posts
  $args = array(
    'post_type' => 'varzybos',
    'posts_per_page' => -1, // get all posts
    'meta_key' => 'varzybu_data',
	'meta_query' => array(
		array(
			'key' => 'varzybu_data',
			'value'   => array(''),
			'compare' => 'NOT IN'
		)
	),
    'orderby' => 'meta_value',
    'order' => 'ASC'
  );
  $query = new WP_Query($args);

  // Arrays to hold our competitions
  $soon_to_begin = array();
  $already_happened = array();
  $happening_now = array();

  // Loop through the posts and sort them into the appropriate array
  if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        $event_date = get_post_meta(get_the_ID(), 'varzybu_data', true);
        $event_end_date = get_post_meta(get_the_ID(), 'varzybu_data_iki', true);
        if (empty($event_end_date)) {
            $event_end_date = $event_date;
        }
        // Convert event_date to DateTime object
        $event_start_date = new DateTime($event_date);
        $event_end_date = new DateTime($event_end_date);
        // Set the time of event_end_date to the end of the day
        $event_end_date->setTime(23, 59, 59); 
        $today = new DateTime();

        if ($today >= $event_start_date && $today <= $event_end_date) {
            $happening_now[] = $query->post;
        } elseif ($today > $event_end_date) {
            $already_happened[] = $query->post;
        } elseif ($today < $event_start_date) {
            $soon_to_begin[] = $query->post;
        }
    }
}

  $already_happened = array_reverse($already_happened);
  // Restore original post data
  wp_reset_postdata();

  return array($soon_to_begin, $already_happened, $happening_now);
}

function get_page_by_title_custom($title)
{
    $query = new WP_Query(
        array(
            'post_type'            => 'page',
            'title'               => $title,
            'post_status'          => 'all',
            'posts_per_page'       => 1,
            'no_found_rows'        => true,
            'ignore_sticky_posts'  => true,
            'update_post_term_cache' => false,
            'update_post_meta_cache' => false,
            'orderby'              => 'post_date ID',
            'order'               => 'ASC',
        )
    );

    if (!empty($query->post)) {
        $page_got_by_title = $query->post;
    } else {
        $page_got_by_title = null;
    }

    return $page_got_by_title;
}
