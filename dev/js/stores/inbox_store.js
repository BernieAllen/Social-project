'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

//var EventEmitterProto = require('events').EventEmitter.prototype;


var CHANGE_EVENT = 'change';

var _store = {
    getMessages: [],
    getSentMessages: [] 
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

    getMessages: function() {
        return _store.getMessages;
    },

    getSentMessages: function() {
        return _store.getSentMessages;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){
     switch(payload.source){
        case "GotData":
	        if(payload.action.actionType === "Inbox_Messages") {
	          	console.log(payload.action.data);
	            _store.getMessages = payload.action.data;
	            AppStore.emitChange();
	        }
            if(payload.action.actionType === "Inbox_Sent_Messages") {
                console.log(payload.action.data);
                _store.getSentMessages = payload.action.data;
                AppStore.emitChange();
            }
	        break;
        default:
        return true;
    }
    return true;
});


module.exports = AppStore;