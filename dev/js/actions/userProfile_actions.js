var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/userProfile_api');



var profileActions = {

    get_user_data: function(userid) {
        var data = api.user_data_call(userid).then(function(resp) {
            var myData = resp.data;
            Dispatcher.handleAPIAction({
                actionType: Constants.Profile_User_Data,
                data: myData
            });
        });
    },

    get_post_data: function(userid) {
        var data = api.user_posts_call(userid).then(function(resp) {
            var myData = resp.data;
            Dispatcher.handleAPIAction({
                actionType: Constants.Profile_Posts_Data,
                data: myData
            });
        });
    },

    get_profile_followers: function(userid) {
        var data = api.profile_followers_call(userid).then(function(resp) {
            var myData = resp.data;
            Dispatcher.handleAPIAction({
                actionType: Constants.Profile_Follower_Data,
                data: myData
            });
        });
    },

    get_profile_following: function(userid) {
        var data = api.profile_following_call(userid).then(function(resp) {
            var myData = resp.data;
            Dispatcher.handleAPIAction({
                actionType: Constants.Profile_Following_Data,
                data: myData
            });
        });
    },

    get_user_likes: function(userid) {
        var data = api.get_user_likes_call(userid).then(function(resp) {
            var myData = resp.data;

            Dispatcher.handleAPIAction({
                actionType: Constants.Profile_Likes_Data,
                data: myData
            });
        });      
    },

    insert_the_follow: function(followed_id, follower_id) {
        var that = this;
        var data = api.follow_user_call(followed_id, follower_id).then(function(resp) {
            resp.data;
            if (resp.data === 'successful_insert') {

                // Call the action checks if a user is followed
                that.check_user_follows(follower_id, followed_id);
                // Call the action that gets the followers of the profile page
                that.get_profile_followers(followed_id);

            }

        });
    },

    handleDialogMessageInsert: function(message, messageTitle, messaged_id, messenger_id) {

          var data = api.dialog_message_insert(message, messageTitle, messaged_id, messenger_id).then(function(resp) {
            var myData = resp.data;
           /* Dispatcher.handleAPIAction({
                actionType: Constants.Profile_Check_Message_Insert,
                data: myData
            });*/
        });
    },


    unFollow_this_user: function(followed_id, follower_id) {
        var that = this;
        var data = api.unfollow_user_call(followed_id, follower_id).then(function(resp) {
            if (resp.data === 'successful_delete') {

                // Call the action checks if a user is followed
                that.check_user_follows(follower_id, followed_id);
                // Call the action that gets the followers of the profile page
                that.get_profile_followers(followed_id);

            }

        });
    },

    check_user_follows: function(logged_in_user_id, visted_profile_id) {
        var data = api.check_if_user_follows(logged_in_user_id, visted_profile_id).then(function(resp) {
            var myData = resp.data;
            Dispatcher.handleAPIAction({
                actionType: Constants.User_Following_Another_User,
                data: myData
            });
        });
    },

};


module.exports = profileActions;