var socket;

var socketUtils = {
  socket: socket,
  id: 0,
  partyThrower: false,

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
    console.log('songs: ', data.songs);

    // This is the userID, store it somewhere:
    this.id = data.uId;
    console.log('socket user Id: ', data.uId)

    // partyThrower role is true for the host, false for party goers:
    this.partyThrower = data.partyThrower;
    console.log('parthThrower: ', data.partyThrower);
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
  
  addVote: function(songID, vote) {
    var context = this;

    socket.emit("vote", {
      userID : context.id,
      songID : songID,
      vote : vote
    });
  }

}

export default socketUtils;