/**
 * Module for purely UI related functions
 */

/**
 * Slide down the element if show is true otherwise slide up
 * @param {Boolean} show 
 * @param {} $element 
 * @param {() => void} done 
 */
const showElement = (show, $element, done) => {
  show ? $element.slideDown(300, done) : $element.slideUp(300, done);
};

/**
 * Reveals the error msg if show is true otherwise hide the error msg
 * @param {Boolean} show toggle show or hidden
 * @param {String} err error message to display
 */
const showErrMsg = (show, err) => {
  const $errMsg = $('#error-msg');
  showElement(show, $errMsg, () => {
    $errMsg.find('h3').text(err || '');
  });
};

/**
 * If show is not passed in, default behaviour is to toggle the compose tweet box
 * i.e. reveal if not visible and vice versa.
 * Reveals the compose tweet box if show is true otherwise hide it
 * @param {[Boolean]} show 
 */
const showComposeTweetBox = (show) => {
  const $form = $('#new-tweet form');
  const toggle = show || !$form.is(":visible");
  showErrMsg(false);
  showElement(toggle, $form, () => {
    $("#new-tweet textarea").focus();
  });
};

/**
 * Reveal "jump to top" button when show is true, at the same time, 
 * hide the "new tweet" button. Vice versa when show is false;
 * @param {Boolean} show 
 */
const showJumpButton = (show) => {
  const $newTweetBtn = $("#new-tweet-btn");
  const $jumpBtn = $('#jump-btn');

  if (show) {
    $newTweetBtn.fadeOut(100, () => {
      $jumpBtn.fadeIn(100);
    });
    return;
  }
  $jumpBtn.fadeOut(100, () => {
    $newTweetBtn.fadeIn(100);
  });
}

/**
 * Update textarea character counter based on inputLength
 * Counter turns red when over maximum input length
 * @param {number} inputLength 
 */
const updateCounter = (inputLength) => {
  const MAX_LENGTH = 140;
  const charsLeft = MAX_LENGTH - inputLength;
  const $counter = $("#new-tweet .counter");
  $counter.val(charsLeft);

  if (charsLeft < 0) { // add css class if over character limit
    return $counter.addClass('red');
  }
  $counter.removeClass('red');
}




