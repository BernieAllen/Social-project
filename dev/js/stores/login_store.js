'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _store = {
  viewAction : [],
  login_user: []
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

    login_user: function() {
       return _store.login_user;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){
      switch(payload.source){
      case "GotData":
          if(payload.action.actionType === "Login_User"){
            _store.login_user = payload.action.data;
            AppStore.emitChange();
          }
          break;
      default:
         return true;
    }
    return true;
});


module.exports = AppStore;