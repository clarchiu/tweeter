$(document).ready(function () {
  $("#new-tweet-btn").on("click", function() {
    showComposeTweetBox();
  });

  $(window).on("scroll", function() {
    const show = $(this).scrollTop() > 340;
    showJumpButton(show);
  });

  $('#jump-btn').on("click", function() {
    showComposeTweetBox(true);
    $(window).scrollTop(0);
  })
});