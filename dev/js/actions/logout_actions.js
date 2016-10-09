var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/logout_api');

var LogoutActions = {

    saveData: function(item) {
       var myLove = api.myLoad(item);
	   	Dispatcher.handleViewAction({
	        actionType: Constants.SaveData,
	        data: myLove
	   	});
    },

    handleLogout: function() {
        var data = api.handleLogout().then(function(resp){
            var myData = resp.data;
                Dispatcher.handleAPIAction({
                    actionType: Constants.Logout_User,
                    data: myData
                }); 
        });
    }
};


module.exports = LogoutActions;