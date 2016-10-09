var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/homePage_api');

var HomeActions = {
    saveData: function(item) {
       var myLove = api.myLoad(item);
	   	Dispatcher.handleViewAction({
	        actionType: Constants.SaveData,
	        data: myLove
	   	});
    },

    Home_Page_Posts: function() {
        var data = api.Home_Page_Posts().then(function(resp){
           var myData = [resp.data];
            myData.map(function(items){
                Dispatcher.handleAPIAction({
                actionType: Constants.Home_Server_Data,
                data: items
                }); 
            });

        });
   	},
};


module.exports = HomeActions;