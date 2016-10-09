'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

//var EventEmitterProto = require('events').EventEmitter.prototype;


var CHANGE_EVENT = 'change';

var _store = {
  userData: [],
  loginStatus: [],
  updatedDataStatus: []
}


var AppStore = Assign({}, EventEmitter.prototype, {

    emitChange: function(change) {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
       this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
       this.removeListener(CHANGE_EVENT, callback);
    },

    userData: function() {
       return _store.userData;
    },

    updatedDataStatus: function() {
       return _store.updatedDataStatus; 
    },

    loginStatus: function() {
       return _store.loginStatus;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){

      switch(payload.source){
        case 'GotData':
          if(payload.action.actionType === 'Login_Status') {
              _store.loginStatus= payload.action.data;
              AppStore.emitChange();
          }
	        if(payload.action.actionType === 'User_Data') {
	             _store.userData= payload.action.data;
	             AppStore.emitChange();
	        }
          if(payload.action.actionType === 'Updated_Data_Status') {
              _store.updatedDataStatus= payload.action.data;
              AppStore.emitChange();
          }
        break;
        /*case 'GotData':

              _store.homePagePostData = payload.action.data;
              AppStore.emitChange();
            break;*/
        default:
           return true;
      }
    return true;
});


module.exports = AppStore;