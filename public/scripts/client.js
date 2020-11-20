/**
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
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
  const $content = $('<p>').text(tweetData.content.text);   //escape user input
  const $tweet = $(`<article class="tweet"></article>`)
                  .append($header, $content, $footer);
  return $tweet;
}

const renderTweets = (tweets) => {
  const $tweetContainer = $('#tweets-container')
  $tweetContainer.empty(); //empty container before rendering

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet); 
  }
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch(function() {
      showErrMsg(true, "Could not load tweets");
    });
}

const submitTweet = (path, formData) => {
  const text = $(formData).find('textarea').val();
  const errMsg = !text ? "TOO SHORT!" : 
                 (text.length > 140 ? "TOO LONG!" : "");
  if (errMsg) {
    return Promise.reject(errMsg);
  }
  return $.ajax(path, { method: 'POST', data: $(formData).serialize() });
}

$(document).ready(function () {
  // load and render tweets from initial-tweets.json
  loadTweets();

  // attach submit event
  $("#new-tweet form").on("submit", function (event) {
    event.preventDefault();
    showErrMsg(false);

    submitTweet('/tweets', this)
      .then(function () {
        $("#new-tweet textarea").val('').trigger('input');
        showErrMsg(false);
        loadTweets();
      })
      .catch(function (err) {
        showErrMsg(true, "Could not submit tweet: " + err);
      });
  });  
});


