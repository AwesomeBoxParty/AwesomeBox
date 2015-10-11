var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _currentTrack = null;
var _playlist = [];
var _partyThrower = false;


function _addSong (data) {
  var track = data;

  if (!_currentTrack) {
    _currentTrack = track;
  } else {
    _playlist = _playlist.concat(track);
  }

};

function _goToNextSong() {
  console.log('_playlist: ', _playlist);
  if (_playlist.length > 0) {
    _currentTrack = _playlist.shift();
  } else {
    _currentTrack = null;
  }
}

function _receiveSongData (data) {
  console.log('receiveSongData: ', data);
  _playlist = data;
};

function _receiveUserRole (data) {
  _partyThrower = data;
};



var AppStore = assign({},EventEmitter.prototype, {

  getCurrentTrack: function() {
    return _currentTrack;
  },

  getPlaylist: function() {
    return _playlist;
  },

  getUserRole: function() {
    return _partyThrower;
  },

  /////////////////////////////////////////////////
  // DATA STORE FUNCTIONS
  /////////////////////////////////////////////////
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }  

});


AppStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case AppConstants.RECEIVE_SONG_DATA:
      _receiveSongData(action.data);
      AppStore.emitChange();
      break;

    case AppConstants.ADD_SONG:
      _addSong(action.data);
      AppStore.emitChange();
      break;

    case AppConstants.NEXT_SONG:
      _goToNextSong();
      AppStore.emitChange();
      break;

    case AppConstants.RECEIVE_USER_ROLE:
      _receiveUserRole(action.data);
      AppStore.emitChange();
      break;

    default:
  }
});


module.exports = AppStore;
