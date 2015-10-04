var socket;

var socketUtils = {
  socket: socket,

  init: function() {
    // Setup Socket:
    socket = io.connect();
    // Setup Event Handlers:
    this.setEventHandlers();
    // Start Connection:
    this.connect();
  },

  setEventHandlers: function() {
    // Set Routes For Connections
    socket.on("initialized", this.onConnected);
    socket.on("update songs", this.onUpdateSongs);
  },
  
  connect: function() {
    // Connect to Server:
    socket.emit("connect", {
      name : "User Name"
    });
  },

  onConnected: function(data) {
    // RECEIVE LIST OF SONGS FROM SERVER:
    console.log(data.songs);
  },

  onUpdateSongs: function(data) {
    // RECEIVE LIST OF SONGS FROM SERVER:
    console.log(data.songs);
  },
  
  addSong: function(song) {
    socket.emit("add song", {
      song : song
    });
  },
  
  addVote: function(userID, songID, vote) {
    socket.emit("vote", {
      userID : userID,
      songID : songID,
      vote : vote
    });
  }

}

export default socketUtils;