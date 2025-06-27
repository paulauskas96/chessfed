<?php
require_once get_template_directory() . '/customFunctions/custom_functions.php';


function display_competitions_columns($atts)
{
  // Enqueue the CSS file
  wp_enqueue_style('my-custom-css', get_stylesheet_directory_uri() . '/my-custom.css');

  list($soon_to_begin, $already_happened, $happening_now) = get_sorted_varzybos_posts();
  // Restore original post data
  wp_reset_postdata();

  $atts = shortcode_atts(
    array(
      'limit' => 6, // Default limit is 6
    ),
    $atts
  );

  // pasirinkti gretai prasides puslpai kad veiktu mygtukas
  $greitai_page = get_page_by_title_custom('Greitai');
  $ivyko_page = get_page_by_title_custom('Ivyko');
  $vyksta_page = get_page_by_title_custom('Vyksta');

  $output = '<div class="competitions-columns">';
  $output .= '<div class="column">';
  $output .= '<h4 class="column-title">Greitai Prasidės</h4>';
  $output .= '<div class="competition-list-wrapper">';

  $counter = 0; // Initialize the counter

  foreach ($soon_to_begin as $post) {
    // Display the post here
    $post_url = get_permalink(($post->ID));
    $output .= '<div class="competition-title-wrapper">';
    $output .= '<a href="' . $post_url . '">';
    $output .= '<div class="image-wrapper">';
    if (has_post_thumbnail($post->ID)) {
      $output .= '<img class="featured-image" src="' . get_the_post_thumbnail_url($post->ID) . '" alt="Featured Image">';
    }
    $output .= '</div>';
    $output .= '<p class="competition-title underline">' . $post->post_title . '</p>';
    $output .= '</a>';
    $output .= '</div>';

    $counter++; // Increment the counter

    if ($counter >= $atts['limit']) {
      break; // Break the loop if the limit is reached
    }
  }
  $output .= '<div class="competition-button-wrapper">';
  $output .= '<a href="' . get_permalink($greitai_page->ID) . '" class="show-all-link">Rodyti viską';
  $output .= '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">';
  $output .= '<path d="M12.3583 9.40825L8.82501 5.87492C8.74754 5.79681 8.65538 5.73481 8.55383 5.69251C8.45228 5.65020 8.34336 5.62842 8.23335 5.62842C8.12334 5.62842 8.01442 5.65020 7.91287 5.69251C7.81132 5.73481 7.71915 5.79681 7.64168 5.87492C7.48647 6.03105 7.39935 6.24226 7.39935 6.46242C7.39935 6.68257 7.48647 6.89378 7.64168 7.04992L10.5917 9.99992L7.64168 12.9499C7.48647 13.1061 7.39935 13.3173 7.39935 13.5374C7.39935 13.7576 7.48647 13.9688 7.64168 14.1249C7.71955 14.2022 7.81189 14.2633 7.91342 14.3047C8.01496 14.3462 8.12367 14.3672 8.23335 14.3666C8.34302 14.3672 8.45174 14.3462 8.55327 14.3047C8.6548 14.2633 8.74715 14.2022 8.82501 14.1249L12.3583 10.5916C12.4365 10.5141 12.4984 10.4219 12.5408 10.3204C12.5831 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.5831 9.78099 12.5408 9.67944C12.4984 9.57789 12.4365 9.48572 12.3583 9.40825Z"/>';
  $output .= '</svg>';
  $output .= '</a>';
  $output .= '</div>';

  $output .= '</div>';
  $output .= '</div>';

  $output .= '<div class="column">';
  $output .= '<h4 class="column-title">Ivyko</h4>';
  $output .= '<div class="competition-list-wrapper">';

  $counter = 0; // Initialize the counter

  foreach ($already_happened as $post) {
    // Display the post here
    $post_url = get_permalink(($post->ID));
    $output .= '<div class="competition-title-wrapper">';
    $output .= '<a href="' . $post_url . '">';
    $output .= '<div class="image-wrapper">';
    if (has_post_thumbnail($post->ID)) {
      $output .= '<img class="featured-image" src="' . get_the_post_thumbnail_url($post->ID) . '" alt="Featured Image">';
    }
    $output .= '</div>';
    $output .= '<p class="competition-title underline">' . $post->post_title . '</p>';
    $output .= '</a>';
    $output .= '</div>';

    $counter++; // Increment the counter

    if ($counter >= $atts['limit']) {
      break; // Break the loop if the limit is reached
    }
  }
  $output .= '<div class="competition-button-wrapper">';
  $output .= '<a href="' . get_permalink($ivyko_page->ID) . '" class="show-all-link">Rodyti viską';
  $output .= '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">';
  $output .= '<path d="M12.3583 9.40825L8.82501 5.87492C8.74754 5.79681 8.65538 5.73481 8.55383 5.69251C8.45228 5.65020 8.34336 5.62842 8.23335 5.62842C8.12334 5.62842 8.01442 5.65020 7.91287 5.69251C7.81132 5.73481 7.71915 5.79681 7.64168 5.87492C7.48647 6.03105 7.39935 6.24226 7.39935 6.46242C7.39935 6.68257 7.48647 6.89378 7.64168 7.04992L10.5917 9.99992L7.64168 12.9499C7.48647 13.1061 7.39935 13.3173 7.39935 13.5374C7.39935 13.7576 7.48647 13.9688 7.64168 14.1249C7.71955 14.2022 7.81189 14.2633 7.91342 14.3047C8.01496 14.3462 8.12367 14.3672 8.23335 14.3666C8.34302 14.3672 8.45174 14.3462 8.55327 14.3047C8.6548 14.2633 8.74715 14.2022 8.82501 14.1249L12.3583 10.5916C12.4365 10.5141 12.4984 10.4219 12.5408 10.3204C12.5831 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.5831 9.78099 12.5408 9.67944C12.4984 9.57789 12.4365 9.48572 12.3583 9.40825Z"/>';
  $output .= '</svg>';
  $output .= '</a>';
  $output .= '</div>';
  $output .= '</div>';
  $output .= '</div>';

  // Check if there are competitions happening now
  if (empty($happening_now)) {
    $output .= '<div class="column">';
    $output .= '<h4 class="column-title">Vyksta</h4>';
    $output .= '<div class="no-competition-list-wrapper">';
    $output .= '<p class="no-competitions-message">Šiuo metu nevyksta jokie turnyrai...</p>';
    $output .= '</div>';
    $output .= '</div>';
  } else {
    $output .= '<div class="column">';
    $output .= '<h4 class="column-title">Vyksta</h4>';
    $output .= '<div class="competition-list-wrapper">';

    $counter = 0; // Initialize the counter

    foreach ($happening_now as $post) {
      // Display the post here
      $post_url = get_permalink(($post->ID));
      $output .= '<div class="competition-title-wrapper">';
      $output .= '<a href="' . $post_url . '">';
      $output .= '<div class="image-wrapper">';
      if (has_post_thumbnail($post->ID)) {
        $output .= '<img class="featured-image" src="' . get_the_post_thumbnail_url($post->ID) . '" alt="Featured Image">';
      }
      $output .= '</div>';
      $output .= '<p class="competition-title underline">' . $post->post_title . '</p>';
      $output .= '</a>';
      $output .= '</div>';

      $counter++; // Increment the counter

      if ($counter >= $atts['limit']) {
        break; // Break the loop if the limit is reached
      }
    }
    $output .= '<div class="competition-button-wrapper">';
    $output .= '<a href="' . get_permalink($vyksta_page->ID) . '" class="show-all-link">Rodyti viską';
    $output .= '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">';
    $output .= '<path d="M12.3583 9.40825L8.82501 5.87492C8.74754 5.79681 8.65538 5.73481 8.55383 5.69251C8.45228 5.65020 8.34336 5.62842 8.23335 5.62842C8.12334 5.62842 8.01442 5.65020 7.91287 5.69251C7.81132 5.73481 7.71915 5.79681 7.64168 5.87492C7.48647 6.03105 7.39935 6.24226 7.39935 6.46242C7.39935 6.68257 7.48647 6.89378 7.64168 7.04992L10.5917 9.99992L7.64168 12.9499C7.48647 13.1061 7.39935 13.3173 7.39935 13.5374C7.39935 13.7576 7.48647 13.9688 7.64168 14.1249C7.71955 14.2022 7.81189 14.2633 7.91342 14.3047C8.01496 14.3462 8.12367 14.3672 8.23335 14.3666C8.34302 14.3672 8.45174 14.3462 8.55327 14.3047C8.6548 14.2633 8.74715 14.2022 8.82501 14.1249L12.3583 10.5916C12.4365 10.5141 12.4984 10.4219 12.5408 10.3204C12.5831 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.5831 9.78099 12.5408 9.67944C12.4984 9.57789 12.4365 9.48572 12.3583 9.40825Z"/>';
    $output .= '</svg>';
    $output .= '</a>';
    $output .= '</div>';

    $output .= '</div>';
    $output .= '</div>';
  }
  $output .= '</div>';


  return $output;
}
add_shortcode('display_competitions', 'display_competitions_columns');
