// document.addEventListener("DOMContentLoaded", function () {
//   let queryLoops = document.querySelectorAll(".custom-hover");
//   queryLoops.forEach(function (queryLoop) {
//     let images = queryLoop.querySelectorAll("img");
//     images.forEach(function (image) {
//       if (image.getAttribute("data-placeholder")) {
//         image.src = image.getAttribute("data-placeholder");
//       }
//     });
//   });
// });
document.addEventListener("DOMContentLoaded", function() {
   var images = document.getElementsByClassName('post-thumbnail');
   if (images.length > 0) {
       images[0].parentNode.removeChild(images[0]);
   }
});
