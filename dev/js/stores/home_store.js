'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

//var EventEmitterProto = require('events').EventEmitter.prototype;


var CHANGE_EVENT = 'change';

var _store = {
  viewAction : [],
  homePagePostData: []
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
      return _store.viewAction;
    },

    homePagePostData: function() {
       return _store.homePagePostData;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){
  if(payload.action.actionType === "Home_Server_Data") {
      switch(payload.source){
        case "SaveData":
            _store.viewAction.push(payload.action.data[0]);
            AppStore.emitChange();
            break;
        case "GotData":

              _store.homePagePostData = payload.action.data;
              AppStore.emitChange();
            break;
        default:
           return true;
      }
  }
    return true;
});


module.exports = AppStore;