'use strict';

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var Assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _store = {
  userData: [],
  userPosts: [],
  userFollowers: [],
  userFollowing: [],
  userLikes: [],
  isUserFollowed: '',
  loggedinUserData: '',
  loginStatus: '',
  checkMessageInsert: []
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

    userData: function() {
        return _store.userData;
    },

    userPosts: function() {
        return _store.userPosts;
    },

    userFollowers: function() {
        return _store.userFollowers;
    },

    userFollowing: function() {
        return _store.userFollowing;
    },

    userLikes: function() {
       return _store.userLikes;
    },

    loginStatus: function() {
       return _store.loginStatus;
    },

    isUserFollowed: function() {
       return _store.isUserFollowed;
    },

    checkMessageInsert: function() {
       return _store.checkMessageInsert;
    },

    loggedinUserData: function() {
       return _store.loggedinUserData;
    },

    getAll: function() {
        return _store;
    }

});

Dispatcher.register(function(payload){
      switch(payload.source){
      case 'GotData':
        switch(payload.action.actionType){
           case 'Profile_User_Data':
              _store.userData = payload.action.data;
              AppStore.emitChange();
           break;
           case 'Profile_Posts_Data':
              _store.userPosts = payload.action.data;
              AppStore.emitChange();
           break;
           case 'User_Data':
              _store.loggedinUserData = payload.action.data;
              AppStore.emitChange();
           break;
           case 'User_Following_Another_User':
              _store.isUserFollowed = payload.action.data;
              AppStore.emitChange();
           break;
           case 'Profile_Follower_Data':
              _store.userFollowers = payload.action.data;
              AppStore.emitChange();
           break;
           case 'Profile_Following_Data':
              _store.userFollowing = payload.action.data;
              AppStore.emitChange();
           break;
           case 'Profile_Likes_Data':
              _store.userLikes = payload.action.data;
              AppStore.emitChange();
           break; 
          case 'Login_Status':
              _store.loginStatus= payload.action.data;
              AppStore.emitChange();
          break;
          case 'Profile_Check_Message_Insert':
              _store.checkMessageInsert = payload.action.data;
              AppStore.emitChange();
          break;

        }
        break;
        default:
      return true;
    }
    return true;
});


module.exports = AppStore;