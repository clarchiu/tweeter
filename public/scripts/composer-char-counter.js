$(document).ready(function() {
  // --- our code goes here ---
  $('#new-tweet textarea').on('input', function() {
    const MAX_LENGTH = 140;
    const $counter = $(this).parent().find('.counter');
    const charsLeft = MAX_LENGTH - $(this).val().length;
    $counter.val(charsLeft);
    charsLeft < 0 ? 
      $counter.addClass('over-word-limit') :
      $counter.removeClass('over-word-limit');
  });
});