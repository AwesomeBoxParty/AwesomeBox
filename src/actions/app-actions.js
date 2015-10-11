var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var socketUtils;

module.exports = {
  //////////////////////////////////
  // USER TRIGGERED ACTIONS
  //////////////////////////////////
  addSong: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.ADD_SONG,
      data: data
    });
  },

  goToNextSong: function () {
    AppDispatcher.dispatch({
      type: AppConstants.NEXT_SONG,
      data: null
    });
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
  }
}