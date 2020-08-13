require('dotenv').config()
const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// start stream and track tweets
const stream = T.stream('statuses/filter', {
    follow: ['3372594015']  //ID's van users
});

// use this to log errors from requests
function responseCallback(err, data, response) {
    console.log(err);
}

// event handler
stream.on('tweet', tweet => {
    console.log(tweet)
    var res = {
        status: 'test response',
        in_reply_to_status_id: '' + tweet.id_str
    };
    T.post('statuses/update', res, responseCallback);
    // like
    T.post('favorites/create', {
        id: tweet.id_str
    }, responseCallback);
});