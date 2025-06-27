jQuery(document).ready(function ($) {
  $(".pagination a").on("click", function (e) {
    e.preventDefault();
    var paged = $(this)
      .attr("href")
      .match(/paged=(\d+)/)[1];
    $.post(
      ajax_pagination.ajax_url,
      {
        action: "my_ajax_pagination",
        paged: paged,
        nonce: ajax_pagination.nonce,
      },
      function (response) {
        // Update your page content with the response
        console.log(response);
        $(".varzybu-list").html(response);

        var paginationLinks = $(response).find(".pagination");
        $(".pagination").html(paginationLinks.html());
      }
    );
  });
});
