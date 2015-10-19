var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

module.exports = {
  //////////////////////////////////
  // USER TRIGGERED ACTIONS
  //////////////////////////////////
  addSong: function (data) {
    var socketUtils = require('../utils/socketUtils');
    socketUtils.addSong(data);
    AppDispatcher.dispatch({
      type: AppConstants.ADD_SONG,
      data: data
    });
  },

  goToNextSong: function () {
    var socketUtils = require('../utils/socketUtils');
    socketUtils.nextSong();
    AppDispatcher.dispatch({
      type: AppConstants.NEXT_SONG,
      data: null
    });
  },  

  upVote: function (trackId) {
    var socketUtils = require('../utils/socketUtils');
    socketUtils.addVote(trackId, 1)
  },

  downVote: function (trackId) {
    var socketUtils = require('../utils/socketUtils');
    socketUtils.addVote(trackId, -1)
  },

  //////////////////////////////////
  // PROGRAM TRIGGERED ACTIONS
  //////////////////////////////////
  receiveSongData: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_SONG_DATA,
      data: data
    });
  },

  receiveUserRole: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_USER_ROLE,
      data: data
    });
  }, 

  togglePlaying: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.TOGGLE_PLAYING,
      data: data
    });
  },
}