fetch("/wp-json/myplugin/v1/varzybos_posts?page=" + page)
  .then((response) => response.json())
  .then((posts) => {
    // Create an empty string to hold the new HTML
    let newHtml = '<div class="varzybu-list">'; // Opening div for the list

    // Loop through the posts and append their HTML to the newHtml string
    posts.forEach((post) => {
      newHtml += '<div class="turnyro-card">';
      newHtml += '<div class="turnyro-info-wrapper">';
      newHtml += "<a href=" + post.url + ">";
      newHtml += '<h3 class="turnyro-title underline">' + post.title + "</h3>";
      newHtml += "</a>";

      // Display the custom field values
      newHtml += '<ul class="turnyro-info">';

      if (post.kiek_dienu) {
        newHtml +=
          '<li class="turnyro-data">Nuo ' +
          post.varzybu_data +
          " iki " +
          post.varzybu_pabaiga +
          "</li>";
      } else {
        newHtml += '<li class="turnyro-data">' + post.varzybu_data + "</li>";
      }

      // Check if "Lietuvos mastu?" is true
      if (post.lietuvos_mastu) {
        // Add a class to change the color to red
        newHtml +=
          '<li class="turnyro-tipas red ' +
          post.turnyro_stilius +
          '">' +
          post.turnyro_stilius +
          "</li>";
      } else {
        // Add a class to change the color to blue
        newHtml +=
          '<li class="turnyro-tipas blue ' +
          post.turnyro_stilius +
          '">' +
          post.turnyro_stilius +
          "</li>";
      }
      newHtml += '<li class="turnyro-vieta">' + post.turnyro_vieta + "</li>";
      newHtml += "</ul>";
      newHtml += "</div>";
      newHtml += "</div>";
    });

    newHtml += "</div>"; // Closing div for the list

    // Replace the old HTML in the container with the new HTML
    document.querySelector(".varzybu-list").innerHTML = newHtml;
  });
