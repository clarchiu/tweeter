/**
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  //assemble tweet
  const avatar = tweetData.user.avatars;
  const username = tweetData.user.name;
  const handle = tweetData.user.handle;
  const timeSince = getTimeSince(tweetData.created_at);

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
      <div class='icons'>icons</div>
    </footer>`
  );
  const $content = $('<p>').text(tweetData.content.text);
  const $tweet = $(`<article class="tweet"></article>`)
                  .append($header, $content, $footer);
  return $tweet;
}

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); 
  }
}

const loadTweets = () => {
  return $.ajax('/tweets', { method: 'GET' });
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
  $("#new-tweet form").on("submit", function (event) {
    event.preventDefault();
    toggleErrMsg(false);

    submitTweet('/tweets', this)
      .then(function () {
        $("#new-tweet textarea").val('').trigger('input');
        toggleErrMsg(false);
        return loadTweets();
      })
      .then(function (tweets) {
        $('#tweets-container').empty();
        renderTweets(tweets);
      })
      .catch(function (err) {
        toggleErrMsg(true, err);
      });
  });  

  loadTweets()
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch(function(err) {
      toggleErrMsg(true, err);
    });
});


