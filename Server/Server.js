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
var setEventHandlers = function() {
  socket.on("connect", onInit);
};
var onInit = function(client) {
  console.log('user connected: ', client.id);
  onConnect(client);
  client.on("add song", onAddSong);
  client.on("vote", onVote);

  client.on('disconnect', function() {
    console.log('user disconnected: ', client.id);
    var index = findUserIndex(client.id);
    if (index >=0) {
      users.splice(index, 1);
      console.log('removed user: ', client.id, ' | total connected users: ', users.length);
    }
  });
};
var onConnect = function(data) {
  //set the role for the client
  var partyThrower = users.length < 1;

  users.push(new User(data.id));

  socket.to(data.id).emit("initialized", {
    songs : songManager.songs,
    uId : data.id,
    partyThrower: partyThrower
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