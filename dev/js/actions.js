var Dispatcher = require('./dispatcher');
var Constants = require('./constants');
var api = require('./api/api');

var AppActions = {
    saveData: function(item) {
       var myLove = api.myLoad(item);
	   	Dispatcher.handleViewAction({
	        actionType: Constants.SaveData,
	        data: myLove
	   	});
    },

    handleLogin: function(email, password) {
        var data = api.handleLogin(email, password).then(function(resp){
            data = resp.data;

                    Dispatcher.handleAPIAction({
                    actionType: Constants.GotData,
                    data: data
                    }); 
              
        });
    },

    gotData: function() {
        var data = api.realAsync().then(function(resp){
            data = resp.data;
            data.map(function(items){
                Dispatcher.handleAPIAction({
		        actionType: Constants.GotData,
		        data: items
    	        });	
            });

        });
   	},
};


module.exports = AppActions;

