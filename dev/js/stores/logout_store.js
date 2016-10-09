'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _store = {
  viewAction : [],
  serverAction: []
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

    userAction: function() {
      var num = 0;
      return _store.viewAction;
    },

    serverAction: function() {
       return _store.serverAction[0];
    },

    getAll: function() {
        return _store;
    }

});


Dispatcher.register(function(payload){
  if(payload.action.actionType === "Logout_User") {
      switch(payload.source){
        case "SaveData":
            _store.viewAction.push(payload.action.data[0]);
            AppStore.emitChange();
            break;
        case "GotData":
              _store.serverAction.push(payload.action.data);
              AppStore.emitChange();
            break;
        default:
           return true;
      }
  }
    return true;
});


module.exports = AppStore;