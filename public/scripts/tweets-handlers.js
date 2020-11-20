/**
 * Functions that the client uses to handle tweets
 */

/**
 * Validates tweet content. 
 * If not valid, returns a rejected Promise with appropriate error message,
 * if tweet is valid, returns resolved Promise.
 * 
 * My reason to return a Promise is so I can chain it nicely along
 * with the other async functions. skipping right to a catch if the tweet 
 * is not valid and still pass along an error message that is specific to 
 * the error
 * @param {string} tweetContent 
 */
const validateTweet = (tweetContent) => {
  if (!tweetContent) {
    return Promise.reject("TOO SHORT!");
  }
  if (tweetContent.length > 140) {
    return Promise.reject("TOO LONG!");
  }
  return Promise.resolve();
}

/**
 * Makes an AJAX POST request to path, request body is $form input.
 * Returns request as a Promise. lets caller handle
 * @param {string} path 
 * @param {*} $form compose tweet form
 */
const submitTweet = (path, $form) => {
  return $.ajax(path, { method: 'POST', data: $form.serialize() });
}

/**
 * Makes an AJAX GET request to PATH to retrieve tweet objects array.
 * Returns request as a Promise. lets caller handle
 * @param {string} path 
 */
const loadTweets = (path) => {
  return $.ajax(path, { method: 'GET' });
}

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