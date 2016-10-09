var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/inbox_api');

var LoginActions = {

    getMessages: function(userid) {
        var data = api.getInboxMessages(userid).then(function(resp){
           var myData = resp.data;
                Dispatcher.handleAPIAction({
                    actionType: Constants.Inbox_Messages,
                    data: myData
                });               
        });
    },

    getSentMessages: function(userid) {
         var data = api.getSentMessages(userid).then(function(resp){
           var myData = resp.data;
           console.log(myData);
                Dispatcher.handleAPIAction({
                    actionType: Constants.Inbox_Sent_Messages,
                    data: myData
                });               
        });
    },

    handleTrash: function(postid, userid) {
        var that = this;
        var data = api.handleInboxTrash(postid, userid).then(function(resp){
            if(resp.data === 'deleted'){
              that.getMessages(userid);
            }          
        });

    }

};


module.exports = LoginActions;