// Node requires
var twitter = require('twitter');
var util = require('util')

var twitterHandle = '@cmiyc63';
// The status to tweet
// var status = 'Hello ' + twitterHandle + '. This is your #Tessel speaking.';

// Enter the oauth key and secret information
var twit = new twitter({
  consumer_key: 'O7oc0pvsZn4xjgcuHuYdX4FaC',
  consumer_secret: 'iJYuHFz2sD46Nvk3mcwzX8uih14aEAMgVWdWoR59nx8v6Zl7ZX',
  access_token_key: '2529232909-luARGU89K4CKFMvfzBjCgG6ubefzDkdDWkSB85i',
  access_token_secret: 'GXQfuzvGdjLEs3t1HEYfhQ9x9bdBcSBVXjBkbRgwYlOE0'
});

// Make a tweet!
twit.post('statuses/update',{status: 'This is a test message 34 - From Tessel'}, function(error, tweet, response) {
  console.log(error);
  console.log(tweet);
  console.log(response); 
});