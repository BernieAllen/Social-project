var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/headerBar_api');

var AppActions = {


    get_login_status: function() { // Retrive login status (Whether)
        var data = api.loginStatus().then(function(resp){
            var myData = resp.data;
                Dispatcher.handleAPIAction({
		        actionType: Constants.Login_Status,
		        data: myData
    	        });	
        });
   	},

    get_user_data: function() {
        var data = api.userData().then(function(resp){
            var myData = resp.data;
            if(myData.length === 1) {
                Dispatcher.handleAPIAction({
                    actionType: Constants.User_Data,
                    data: myData
                }); 
            }        
        });
    }
};


module.exports = AppActions;