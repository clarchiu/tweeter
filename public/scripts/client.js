/**
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Returns the jQuery element for the tweet data
 * @param {*} tweetData tweet object from server
 */
const createTweetElement = (tweetData) => {
  //parse tweet data
  const avatar = tweetData.user.avatars;
  const username = tweetData.user.name;
  const handle = tweetData.user.handle;
  const timeSince = getTimeSince(tweetData.created_at);

  //assemble the html for a tweet
  const $header = $(
    `<header>
      <img src=${avatar}>
      <h4>${username}</h4>
      <h4 class = 'handle'>${handle}</h4>
    </header>`
  );
  const $footer = $(
    `<footer>
      <h6>${timeSince} ago</h6>
      <div class='icons'>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>`
  );
  //escape user input
  const $content = $('<p>').text(tweetData.content.text);   
  const $tweet = $(`<article class="tweet"></article>`)
  return $tweet.append($header, $content, $footer);
  ;
}

/**
 * For each tweet object in tweets, call createTweetElement and render 
 * it in the #tweet-container element
 * @param {[]} tweets array of tweet objects
 */
const renderTweets = (tweets) => {
  const $tweetContainer = $('#tweets-container')
  $tweetContainer.empty(); //empty container before rendering

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet); 
  }
}

/**
 * Makes an AJAX GET request to PATH to retrieve tweet objects array.
 * If successful then call renderTweets,
 * Otherwsie display error message
 */
const loadTweets = (path) => {
  $.ajax(path, { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch(function() {
      showErrMsg(true, "Could not load tweets");
    });
}

/**
 * Validates tweet content. If not valid, returns appropriate error message,
 * if tweet is valud, returns empty string
 * @param {string} tweetContent 
 */
const validateTweet = (tweetContent) => {
  if (!tweetContent) {
    return "TOO SHORT!";
  }
  if (tweetContent.length > 140) {
    return "TOO LONG!";
  }
  return "";
}

/**
 * Makes an AJAX POST request to path, request body is $form input.
 * Calls loadTweets on success, otherwise display error message
 * @param {string} path 
 * @param {*} $form compose tweet form
 */
const submitTweet = (path, $form) => {
  $.ajax(path, { method: 'POST', data: $form.serialize() })
    .then(function () {
      $('#new-tweet textarea').val('').trigger('input');
      loadTweets(path);
    })
    .catch(function(err) {
      showErrMsg(true, "Could not complete request");
    });
}

$(document).ready(function () {
  const PATH = "/tweets";
  // load and render tweets from initial-tweets.json
  loadTweets(PATH);

  // attach submit event
  $("#new-tweet form").on("submit", function (event) {
    event.preventDefault();
    showErrMsg(false); // hide error message on submit

    const tweetContent = $('#new-tweet textarea').val();
    const errMsg = validateTweet(tweetContent); // this returns error message if not valid

    if (errMsg) { // if errMsg is non-empty then tweet is not valid
      showErrMsg(true, errMsg);
      return;
    }
    submitTweet(PATH, $(this))
  });  
});


