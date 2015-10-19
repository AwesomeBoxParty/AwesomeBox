var socket;
var AppActions = require('../actions/app-actions');

var socketUtils = {
  socket: socket,
  id: 0,
  partyThrower: false,

  init: function() {
    // Setup Socket:
    socket = io.connect();
    // Setup Event Handlers:
    this.setEventHandlers();
  },

  setEventHandlers: function() {
    // Set Routes For Connections
    socket.on("initialized", this.onConnected);
    socket.on("update songs", this.onUpdateSongs);
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
    
    AppActions.receiveUserRole(data.partyThrower);
    AppActions.receiveSongData(data.songs);
  },

  onUpdateSongs: function(data) {
    // RECEIVE LIST OF SONGS FROM SERVER:
    AppActions.receiveSongData(data.songs);
  },
  
  addSong: function(song) {
    socket.emit("add song", {
      song : song
    });
  },

  nextSong: function () {
    socket.emit('next song');
  },
  
  addVote: function(songID, vote) {
    var voteObj = { userID : this.id,
                    songID : songID,
                    vote : vote
                  };
    socket.emit("vote", voteObj);
  }

}

export default socketUtils;