$(document).ready(function () {
  $("nav div").on("click", function() {
    toggleNewTweet();
  });

  const $jumpBtn = $('span.fa-stack');
  const $window = $(window);

  $window.on("scroll", function() {
    const $newTweetBtn = $("nav div");
    const scrollPos = $window.scrollTop();
    
    if (scrollPos > 340) {
      $newTweetBtn.fadeOut(100, () => {
        $jumpBtn.fadeIn(100);
      });
    } else {
      $jumpBtn.fadeOut(100, () => {
        $newTweetBtn.fadeIn(100);
      });
    }
  });

  $jumpBtn.on("click", function() {
    const $form = $('#new-tweet form');
    slideElement(false, $form, () => {
      focusTextArea($form);
    });
    $window.scrollTop(0);
  })
});