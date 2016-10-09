'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

//var EventEmitterProto = require('events').EventEmitter.prototype;


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
       return _store.serverAction;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){
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
    return true;
});


module.exports = AppStore;

















/*var StoreMethods = {
    init: function() {},
    set: function (arr) {
    	var currIds = this._data.map(function(m){
        return m.id;});
    
    	arr.filter(function (item){
          return currIds.indexOf(item.id) === -1;
    	}).forEach(this.add.bind(this));
    },
    add: function(item){
    	this._data.push(item);
    },
    all: function() {
    	return this._data;
    },
    get: function(id){
       return this._data.filter(function(item){
           return item.cid === id;
       })[0];
    },
    addChangeListener: function(fn) {
    	this.on(CHANGE_EVENT, fn);
    },
    removeChangeListener: function(fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange: function() {
    	this.emit(CHANGE_EVENT);
    },
    bind: function(actionType, actionFn) {
        if(this.actions[actionType]){
        	this.actions[actionType].push(actionFn);
        } else {
        	this.actions[actionType] = [actionFn];
        }
    }
};

exports.extend = function(methods) {
  var store = {
   	  _data: [],
   	  actions: {}
  };

   Assign(store, EventEmitterProto, StoreMethods, methods);
   store.init();

   require('../dispatcher').register(function(action){

       if(store.actions[action.actionType]){
           store.actions[action.actionType].forEach(function(fn){
            
           	fn.call(store, action.data);
          }) 	
       }
   });

   return store;
};*/