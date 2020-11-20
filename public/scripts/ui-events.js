/**
 * Attach event handlers for UI events
 */

$(document).ready(function () {
  // Show "jump to top" button when user scrolls far down enough
  $(window).on("scroll", function() {
    const show = $(this).scrollTop() > 340;
    showJumpButton(show);
  });

  // Toggle compose tweet box when nav button is clicked
  $("#new-tweet-btn").on("click", function() {
    showComposeTweetBox();
  });

  // Updates the counter when the compose tweet box has input
  $('#new-tweet textarea').on('input', function() {
    const inputLength = $(this).val().length
    updateCounter(inputLength);
  });

  // Scroll to top when "jump to top" button is clicked
  $('#jump-btn').on("click", function() {
    showComposeTweetBox(true);
    $(window).scrollTop(0);
  })
});