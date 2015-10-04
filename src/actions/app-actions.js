var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var socketUtils;

module.exports = {
  //////////////////////////////////
  // USER TRIGGERED ACTIONS
  //////////////////////////////////
  exampleFunction: function (data) {
    //
  },


  //////////////////////////////////
  // PROGRAM TRIGGERED ACTIONS
  //////////////////////////////////
  receiveUserRole: function (data) {
    console.log('app-actions: receiving user role --', data);

    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_USER_ROLE,
      data: data
    });
  }
}