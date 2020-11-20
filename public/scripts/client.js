/**
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * If err is a string, just return it
 * Otherwise in the case of an ajax error, parse the error
 * to a meaningful string and return it.
 * @param {*} err error to parse
 */
const errToString = (err) => {
  if (typeof err === "string") {
    return err;
  }
  let msg = "Could not complete request.";
  const status = err.status;
  const statusText = err.statusText;
  if (status && statusText) { // so there can be meaningful error msg if it's an ajax error
    msg += `Status: ${status} ${statusText}`;
  }
  return msg;
};

/**
 * Initialize page with static tweets.
 * Calls loadTweets to retrieve tweets. If successful then calls renderTweets to
 * add tweets to html, otherwise display error message
 * @param {*} path
 */
const start = (path) => {
  loadTweets(path)
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      showErrMsg(true, errToString(err));
    });
};

$(document).ready(function() {
  const PATH = "/tweets";

  start(PATH);  // initialize page with static tweets

  // --- Submit Tweet ---
  $("#new-tweet form").on("submit", function(event) {
    const $textarea = $('#new-tweet textarea');

    event.preventDefault();
    showErrMsg(false); // hide error message on submit

    validateTweet($textarea.val())  // check that the tweet is valid
      .then(() => {                 // passing along an error if not
        return submitTweet(PATH, $(this));
      })
      .then(() => {
        $textarea.val('');  // clear textarea
        updateCounter(0);   // reset counter to 140
        return loadTweets(PATH);
      })
      .then((tweets) => {
        renderTweets(tweets);
      })
      .catch((err) => {
        showErrMsg(true, errToString(err));
      });
  });
});



