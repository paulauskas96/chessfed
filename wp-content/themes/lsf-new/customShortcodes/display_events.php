<?php

require_once get_template_directory() . '/customFunctions/custom_functions.php';

function custom_wp_trim_excerpt($text)
{
    $raw_excerpt = $text;
    if ('' == $text) {
        $text = get_the_content('');
        $text = strip_shortcodes($text);
        $text = apply_filters('the_content', $text);
        $text = str_replace(']]>', ']]&gt;', $text);
        $allowed_tags = '<p>,<a>,<em>,<strong>';
        $text = strip_tags($text, $allowed_tags);
        $excerpt_word_count = 55;
        $excerpt_length = apply_filters('excerpt_length', $excerpt_word_count);
        $excerpt_end = '...';
        $excerpt_more = apply_filters('excerpt_more', ' ' . $excerpt_end);
        $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
        if (count($words) > $excerpt_length) {
            array_pop($words);
            $text = implode(' ', $words);
            $text = $text . $excerpt_more;
        } else {
            $text = implode(' ', $words);
        }
    }
    return apply_filters('wp_trim_excerpt', $text, $raw_excerpt);
}
remove_filter('get_the_excerpt', 'wp_trim_excerpt');
add_filter('get_the_excerpt', 'custom_wp_trim_excerpt');

function display_events($atts)
{
    $title = $atts['title'];
    $posts_per_page = isset($atts['limit']) ? (int)$atts['limit'] : 6;
    list($soon_to_begin, $already_happened, $happening_now) = get_sorted_varzybos_posts();
    $all_posts = array();

    if ($title == 'Ivyko') {
        $all_posts = $already_happened;
    }
    if ($title == 'Vyksta') {
        $all_posts = $happening_now;
    }
    if ($title == 'Greitai') {
        $all_posts = $soon_to_begin;
    }

    // Limit the number of posts to 10 per page
    $paged = max(1, get_query_var('paged')) ? get_query_var('paged') : 1;
    $paged = intval($paged);
    $posts_per_page = intval($posts_per_page);
    $offset = ($paged - 1) * $posts_per_page;
    $posts = array_slice($all_posts, $offset, $posts_per_page);

    $output = '<div class="events-list-wrapper">';
    foreach ($posts as $post) {
        // Display the post here
        $post_url = get_permalink($post->ID);
        $output .= '<div class="event-wrapper box-shadow">';
        $output .= '<div class="event-title-wrapper">';
        $output .= '<a href="' . $post_url . '">';
        $output .= '<h2 class="event-title has-lg-r-font-size">' . $post->post_title . '</h2>';
        $output .= '</a>';
        $output .= '</div>';
        // Display the post write date
        $post_date = get_post_time('Y-m-d H:i', true, $post->ID);
        $output .= '<p class="post-date has-sm-r-font-size">' . $post_date . '</p>';

        // Display the post excerpt with html tags
        $output .= '<div class="excerpt has-bs-r-font-size">';
        setup_postdata($post);
        $excerpt = get_the_excerpt();
        $output .= '<p>' . $excerpt . '</p>';
        wp_reset_postdata();
        $output .= '</div>';
        $output .= '</div>';
    }
    $output .= '</div>';


    // Add pagination links to the output
    $big = 999999999; // need an unlikely integer

    $output .= '<div class="pagination-wrapper">';
    if (get_previous_posts_link()) {
        $output .= '<div class="nav-previous alignleft has-sm-r-font-size">';
        $output .= '<span class="wp-block-post-navigation-link__arrow-previous is-arrow-chevron" aria-hidden="true">';
        $output .= '«</span>';
        $output .= get_previous_posts_link('Praeitas puslapis');
        $output .= '</div>';
    }
    if ($paged * $posts_per_page < count($all_posts)) {
        $output .= '<div class="nav-next alignright has-sm-r-font-size">';
        $output .= get_next_posts_link('Sekantis puslapis', $big);
        $output .= '<span class="wp-block-post-navigation-link__arrow-next is-arrow-chevron" aria-hidden="true">';
        $output .= '»</span>';
        $output .= '</div>';
    }
    $output .= '</div>';


    return $output;
}
add_shortcode('display_events', 'display_events');
