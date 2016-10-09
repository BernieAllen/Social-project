var Dispatcher = require('../dispatcher');
var Constants = require('../constants');
var api = require('../api/dashboard_api');

var AppActions = {

    get_following_posts: function(userid) {
        var data = api.getFollowingPosts(userid).then(function(resp) {
            var myData = resp.data;
            myData.map(function(items) {
                Dispatcher.handleAPIAction({
                    actionType: Constants.Dashboard_Newsfeed_Posts,
                    data: myData
                });
            });
        });
        return data;
    },

    post_with_image: function(userid, category, myFile, myText) {
        var that = this;
        var data = api.insertPostWithImage(userid, category, myFile, myText).then(function(resp) {
            var myData = resp.data;
                Dispatcher.handleAPIAction({
                    actionType: Constants.Dashboard_Post_Insert_Success,
                    data: myData
                });
         
            if (myData === 'all_good') {
                that.get_following_posts(userid);
            }
        });
        return data;
    },

    post_without_image: function(userid, category, myText) {
        var that = this;
        var data = api.insertPostWithoutImage(userid, category, myText).then(function(resp) {
            var myData = resp.data;
            if (myData === 'all_good') {
                that.get_following_posts(userid);
            }

        });
        return data;
    },

    delete_post: function(userid, postid, image) {
        var that = this;
        var data = api.deletePost(userid, postid, image).then(function(resp) {
            var myData = resp.data;
            if (myData === 'deleted') {
                that.get_following_posts(userid);
            }

        });
        return data;
    },

    messages_notifications: function(user_id) {
          var data = api.get_notication_messages(user_id).then(function(resp) {
            var myData = resp.data;
            console.log(myData);
            Dispatcher.handleAPIAction({
                actionType: Constants.Dashboard_Private_Messages,
                data: myData
            });
        });
    },

    insert_like: function(loggedin_user_id, postid) {
        var that = this;
        var data = api.insertLike(loggedin_user_id, postid).then(function(resp) {
            var myData = resp.data;

            if(myData === 'all_good' || myData === 'deleted') {
                 that.get_following_posts(loggedin_user_id);
            }
        });
        return data;
    },
};


module.exports = AppActions;