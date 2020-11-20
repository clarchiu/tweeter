/**
 * Module for purely UI related functions
 */


const slideElement = (up, $element, done) => {
  up ? $element.slideUp(300, done) : $element.slideDown(300, done);
}

/**
 * Reveals the error msg if show is true otherwise hide the error msg
 * @param {Boolean} show toggle show or hidden
 * @param {String} err error message to display
 */
const toggleErrMsg = (show, err) => {
  const $errDialog = $('#error-msg');
  const done = (msg) => {
    $errDialog.find('h3').text(msg);
  }
  if (show) {
    $errDialog.slideDown(300, () => {
      done(err);
    });
  } else if ($errDialog.is(":visible")) {
    $errDialog.slideUp(300, () => {
      done('');
    });
  }
}

const focusTextArea = ($form) => {
  $form.find('textarea').focus();
}

const toggleNewTweet = () => {
  const $form = $('#new-tweet form');
  toggleErrMsg(false);
  $form.slideToggle(300, () => {
    focusTextArea($form);
  });
}



