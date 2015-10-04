var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _songs = [];
var _partyThrower = false;


var _receiveSongData = function (data) {
  _songs = data;
};

var _otherFunction = function () {
  //handles some other dispatched data

};

var _receiveUserRole = function(data) {
  console.log('Calling _receiveUserRole in AppStore:', data);
  _partyThrower = data;
};

var AppStore = assign({},EventEmitter.prototype, {

  getSongs: function() {
    return _songs;
  },

  getUserRole: function() {
    console.log('getUserRole being called in AppStore');
    return _partyThrower;
  },

  /////////////////////////////////////////////////
  // DATA STORE FUNCTIONS
  /////////////////////////////////////////////////
  emitChange: function() {
    console.log('Emitting change');
    this.emit('change');
  },

  addChangeListener: function(callback) {
    console.log('change listener added:', callback);
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }  

});



AppStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case AppConstants.LOAD_SONG_DATA:
      _receiveSongData(action.data);
      AppStore.emitChange();
      break;

    case AppConstants.RECEIVE_USER_ROLE:
      console.log('App store: receiving user role -- ', action.data);
      _receiveUserRole(action.data);
      AppStore.emitChange();
      break;

    default:
  }
});


module.exports = AppStore;
