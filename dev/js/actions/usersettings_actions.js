var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/usersettings_api');
var UpdatedUserData = require('./headerBar_actions');

var HomeActions = {
    update_basic_settings: function(firstname, lastname, email, about, userid) {
      var data = api.updateSettings(firstname, lastname, email, about, userid).then(function(resp){
           var myData = resp.data;

            if(myData === 'Record updated successfully') {
               UpdatedUserData.get_user_data();
            }

              Dispatcher.handleAPIAction({
                actionType: Constants.Updated_Data_Status,
                data: myData
              }); 


        });
    },

    update_email: function(item) {
      var myLove = api.myLoad(item);
      Dispatcher.handleViewAction({
          actionType: Constants.SaveData,
          data: myLove
      });
    },


};


module.exports = HomeActions;