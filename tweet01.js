// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Tessel - Twitter Test 01
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//var tessel = require('tessel');
var Twitter = require('twitter');
//var http = require('https');
 
var client = new Twitter({
  consumer_key: 'W1pxdaLT0cWqedI87Zh5bhVEg',
  consumer_secret: 'RQKuUfzEynXFmY7hzV5dHMgMhNIOZW5S0iFC0nUcZ5Rv8ufeCm',
  access_token_key: '3229560628-3ZvD4N8GmZ5SQUd8YsflZILEMhUuPxZJfMb95N7',
  access_token_secret: 'rkSauDC0GRToqoA6ojJJyskBscHePKoQN0wgCvIaonvJC'
});

//var tweetMessage = "This is a test message 02";

client.post('statuses/update', {status: 'This is a test message 24'}, function(error, tweet, response) {
  console.log(error);
  console.log(tweet);
  console.log(response); 
});
