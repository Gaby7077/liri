require("dotenv").config(); 

//modularization//
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var lineaComando = process.argv;

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var movie = process.argv[3];



switch(command) {

    case "my-tweets":
    var params = {screen_name: 'nodejs', count: "20"};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i=0; i<20; i++){
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
    //console.log(tweets);
}
  }
});
break;

case "movie-this":
if(movie === undefined || movie=== null){
movie="Mr Nobody";

}

if(lineaComando >= 4){
  //return movie;

  for (var i = 4; i <= lineaComando.length; i++) {
      movie = movie + "+" + lineaComando[i];
  }
  };
//console.log(movie);


  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
  

      var JSONmovies = JSON.parse(body);

      console.log("Movie title:" + JSONmovies.Title);
      console.log("Movie year:" + JSONmovies.Year);
      console.log("Raiting:" + JSONmovies.Rated);
      console.log("Rotten tomatoes: " + JSONmovies.Ratings[1].Value);
      console.log("Country: " + JSONmovies.Country);
      console.log("Language: " + JSONmovies.Language);
      console.log("Plot: " + JSONmovies.Plot);
      console.log("Actors: " + JSONmovies.Actors);
    }
  });
break;

case "spotify-this-song":
if(movie === undefined || movie=== null){
  movie="The Sign";
  
  }

spotify.search({ type: 'track', query: movie }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  for (var i = 19; i < data.tracks.items.length; i++) {
    console.log(data.tracks.items[i].name); 
    console.log(data.tracks.items[i].preview_url); 
    console.log(data.tracks.items[i].artists[0].name); 
    console.log(data.tracks.items[i].album.name); 
}
}
);
}
   






