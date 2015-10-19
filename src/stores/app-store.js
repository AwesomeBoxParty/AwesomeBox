var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _currentTrack = null;
var _playlist = [];
var _partyThrower = false;
var _playing = false;
var _autoPlaying = false;


function _addSong (data) {
  var track = data;

  if (!_currentTrack) {
    _currentTrack = track;
    _playing = true;
  } else {
    _playlist = _playlist.concat(track);
  }

};

function _goToNextSong() {
  console.log('_playlist: ', _playlist);
  _currentTrack = _playlist.shift();
  if (_currentTrack) {
    _playing = true;
  }
}

function _receiveSongData (data) {
  _currentTrack = data.shift();
  _playlist = data;
  console.log('=========>Received updated song data from server');
  console.log('currentTrack: ', _currentTrack ? _currentTrack.title : 'none');
  console.log('playlist: ', _playlist);
  if (_currentTrack) {
    _playing = true;
  }
};

function _receiveUserRole (data) {
  _partyThrower = data;
};

function _togglePlaying(data) {
  _playing = data || !_playing;
}


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

  getPlaying: function () {
    return _playing;
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

    case AppConstants.TOGGLE_PLAYING:
      _togglePlaying(action.data);
      AppStore.emitChange();
      break;

    default:
  }
});

module.exports = AppStore;
