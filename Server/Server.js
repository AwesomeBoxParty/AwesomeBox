// SETUP:
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var server_port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
var fs = require('fs');
// OBJECTS:
var SongManager = require("./SongManager").SongManager;
var songManager = new SongManager();

var User = require("./User").User;
// MEMORY:
var users = [];

// HELPER FUNCTIONS:
var findUserIndex = function(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return i;
    }
  }
  return -1;
}


// SETUP:
app.use(express.static(path.join(__dirname, '../dist')));

var onConnect = function(socket) {
  //set the role for the client 
  //TEMP: hardcode everyone to partyThrower to simplify testing
  var partyThrower = users.length < 1;

  users.push(new User(socket.id));

  socket.emit("initialized", {
    songs : songManager.songs,
    uId : socket.id,
    partyThrower: partyThrower
  });

  console.log('user connected: ', socket.id, ' | total connected users: ', users.length);
};

var onAddSong = function(data) {
  console.log('add song:', data.song.title);
  songManager.addSong(data.song);
  publishSongs();
};

var onNextSong = function () {
  songManager.nextSong();
  publishSongs();
}

var onVote = function(data) {
  songManager.postVote(data);
  publishSongs();
};

var publishSongs = function() {
  console.log('publishSongs to all users: ', users.length, ' users');

  songManager.calcVotes();

  io.emit("update songs", {
    songs : songManager.songs
  });
};

var onInit = function(socket) {
  console.log('attaching socket event handlers');
  onConnect(socket);
  socket.on("add song", onAddSong);
  socket.on("next song", onNextSong);
  socket.on("vote", onVote);

  socket.on('disconnect', function() {
    console.log('user disconnected: ', socket.id);
    var index = findUserIndex(socket.id);
    if (index >=0) {
      users.splice(index, 1);
      console.log('removed user: ', socket.id, ' | total connected users: ', users.length);
    }
  });
};

// Initialize socket.io channel
io.on("connection", onInit);

// Send index page html
app.get('/', function(req, res) {
  res.sendfile("public/html/index.html");
});
// Turn on server
http.listen(server_port,  function() {
  console.log("App Listening on server_port: "+ server_port);
});

