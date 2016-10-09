var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/register_api');

var RegistrationActions = {
    saveData: function(item) {
       var myLove = api.myLoad(item);
	   	Dispatcher.handleViewAction({
	        actionType: Constants.SaveData,
	        data: myLove
	   	});
    },

    register_user: function(firstname, lastname, email, password) {
        var data = api.registerUser(firstname, lastname, email, password).then(function(resp){
            var myData = resp.data;
                Dispatcher.handleAPIAction({
                actionType: Constants.Register_User,
                data: myData
                });               
        });
    },
};


module.exports = RegistrationActions;