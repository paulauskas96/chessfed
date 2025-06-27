<?php
function online_turnyrai_posts_shortcode($atts)
{
    $atts = shortcode_atts(array(
        'limit' => 10, // Change this number to control the number of posts displayed
    ), $atts);

    // Query the posts from the 'online_turnyrai' custom post type
    $args = array(
        'post_type' => 'online_turnyrai',
        'posts_per_page' => $atts['limit'],
    );
    $query = new WP_Query($args);

    // Check if there are posts
    if ($query->have_posts()) {
        $output = '<div class="online-turnyrai-list">'; // Opening div for the list
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
            $turnyro_stilius = get_post_meta(get_the_ID(), 'sachmatu_tipas', true);

            // Format the turnyro tipas
            $turnyro_stilius_formatted = str_replace(
                array('ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž', 'Ą', 'Č', 'Ę', 'Ė', 'Į', 'Š', 'Ų', 'Ū', 'Ž'),
                array('a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z', 'a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z'),
                $turnyro_stilius
            );
            $turnyro_stilius_formatted = mb_strtolower($turnyro_stilius_formatted);

            // Display the custom field values
            $output .= '<ul class="turnyro-info">';
            $output .= '<li class="turnyro-data">' . $varzybu_data . '</li>';
            $output .= '<li class="turnyro-tipas ' . $turnyro_stilius_formatted . '" >' . $turnyro_stilius . '</li>';
            $output .= '</ul>';
            $output .= '</div>';

            $output .= '</div>';
        }
        $output .= '</div>'; // Closing div for the list
    } else {
        $output = 'Artimiausiu metu turnyrų nėra.';
    }

    // Restore original post data
    wp_reset_postdata();

    return $output;
}
add_shortcode('online_turnyrai_posts', 'online_turnyrai_posts_shortcode');
