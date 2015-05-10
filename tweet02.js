
var Twit = require('twitter');
 
var client = new Twit({
  consumer_key: 'mbV82Es42fk1mYrURbub5caBl',
  consumer_secret: 'vbuYy7dJkq96aORjUPcFsOMEfQHzaUZR7hXqtKWrVaemDMpPK4',
  access_token_key: '3229560628-iE8I7RoNtf2iHofksNslC8ApETlGACXm5N2hxfV',
  access_token_secret: 'mPRPuKhIQC0KptriK70uMRvvY1uwjyXjgKaEsZFWH322a'
});

client.post('statuses/update',{status: 'This is a test message 40 - From Tessel'}, function(error, tweet, response) {
  console.log(error);
  console.log(tweet);
  console.log(response); 
});
