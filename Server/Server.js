// SETUP:
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var socket = require('socket.io')(http);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var bodyParser = require('body-parser')
var fs = require('fs');
// OBJECTS:
var SongManager = require("./SongManager").SongManager;
var songManager = new SongManager();

var User = require("./User").User;
// MEMORY:
var users = [];
// SETUP:
app.use(express.static(path.join(__dirname, '../dist')));
var setEventHandlers = function() {
  socket.on("connect", onInit);
};
var onInit = function(client) {
  console.log('user connected: ', client.id);
  onConnect(client);
  client.on("add song", onAddSong);
  client.on("vote", onVote);
  socket.sockets.on('disconnect', function() {
    console.log('user disconnected');
  });
};
var onConnect = function(data) {
  
  users.push(new User(data.id));

  socket.to(data.id).emit("initialized", {
    songs : songManager.songs
  });
  console.log("Added User: " + data.id);
}
var onAddSong = function(data) {
  songManager.addSong(data.song);
  publishSongs();
}

var onVote = function(data) {
  songManager.postVote(data);
  publishSongs();
}

var publishSongs = function() {
  users.forEach(function(user) {
    console.log('publishSongs to user: ', user.id);

    socket.to(user.id).emit("update songs", {
      songs : songManager.songs
    });
  });
}
// Send index page html
app.get('/', function(req, res) {
  res.sendfile("public/html/index.html");
});
// Turn on server
http.listen(server_port, server_ip_address, function() {
  console.log("App Listening on " + server_ip_address + ", server_port "
      + server_port);
});

setEventHandlers();