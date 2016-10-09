var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/login_api');

var LoginActions = {
    saveData: function(item) {
       var myLove = api.myLoad(item);
	   	Dispatcher.handleViewAction({
	        actionType: Constants.SaveData,
	        data: myLove
	   	});
    },

    handleLogin: function(email, password) {
        var data = api.handle_login(email, password).then(function(resp){
           var myData = resp.data;
                Dispatcher.handleAPIAction({
                    actionType: Constants.Login_User,
                    data: myData
                });               
        });
    },

};


module.exports = LoginActions;