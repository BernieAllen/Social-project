'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _store = {
  viewAction : [],
  loginStatus: '',
  userData: [],
}


var AppStore = Assign({}, EventEmitter.prototype, {

    componentDidMount: function() { 
    Actions.get_user_data();
    Actions.get_login_status();
       Store.addListener("change", this._dashboardData);
    },

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

    loginStatus: function() {
      if(_store.loginStatus !== ''){
       return _store.loginStatus;
      }
    },

    userData: function() {  
      if(_store.userData !== '') {
          return _store.userData;
      }
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
          if(payload.action.actionType === "Login_Status") {
            console.log(payload.action.data);
              _store.loginStatus= payload.action.data;
              AppStore.emitChange();
          }
          if(payload.action.actionType === "User_Data") {
            console.log(payload.action.data);
              _store.userData= payload.action.data;
              AppStore.emitChange();
          }
          
            break;
        default:
           return true;
      }
    return true;
});


module.exports = AppStore;