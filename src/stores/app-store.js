var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _songs = [];


var _receiveSongData = function (data) {
  _songs = data;
};

var _otherFunction = function () {
  //handles some other dispatched data

};

var AppStore = assign({},EventEmitter.prototype, {

  getSongs: function() {
    return _songs;
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

    case AppConstants.LOAD_SONG_DATA:
      _receiveSongData(action.data);
      AppStore.emitChange();
      break;

  }
});


module.exports = AppStore;
