/**
 * Module for purely UI related functions
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

const showComposeTweetBox = (show) => {
  const $form = $('#new-tweet form');
  const shouldShow = show || !$form.is(":visible");
  showErrMsg(false);
  showElement(shouldShow, $form, () => {
    $form.find('textarea').focus();
  });
};

const showJumpButton = (show) => {
  const $newTweetBtn = $("#new-tweet-btn");
  const $jumpBtn = $('#jump-btn');

  if (show) {
    $newTweetBtn.fadeOut(100, () => {
      $jumpBtn.fadeIn(100);
    });
  } else {
    $jumpBtn.fadeOut(100, () => {
      $newTweetBtn.fadeIn(100);
    });
  }
}



