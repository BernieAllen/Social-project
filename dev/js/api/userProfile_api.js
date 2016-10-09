var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var profileAPI = {

  user_data_call: function(userid) {
       var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           id: userid,
           phase: 'get_user_data'
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
       return myData 
  },

  user_posts_call: function(userid) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           id: userid,
           phase: 'get_post_data'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData 
  },

  profile_followers_call: function(userid) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           id: userid,
           phase: 'get_user_followers'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData    
  },

  profile_following_call: function(userid) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           id: userid,
           phase: 'get_user_following'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData    
  },

  get_user_likes_call: function(userid) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           userid: userid,
           phase: 'get_user_likes'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData; 
  },

  dialog_message_insert: function(message, messageTitle, messaged_id, messenger_id) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           messageTitle: messageTitle,
           message: message,
           messaged_id: messaged_id,
           messenger_id: messenger_id,
           phase: 'insert_message'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData; 
  },

  follow_user_call: function(followed_id, follower_id) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           followed_id: followed_id,
           follower_id: follower_id,
           phase: 'insert_a_follow'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData; 
  },

  unfollow_user_call: function(followed_id, follower_id) {
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           followed_id: followed_id,
           follower_id: follower_id,
           phase: 'unfollow_this_user'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData; 
  },

  check_if_user_follows: function(logged_in_user_id, visted_profile_id){
      var myData = ajax.post('server/routes/userprofile.php', query.stringify({
           logged_in_user_id: logged_in_user_id,
           visted_profile_id: visted_profile_id,
           phase: 'check_if_user_follows'
      }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
      });
      return myData;  
  }
} 


module.exports = profileAPI;