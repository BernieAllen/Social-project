var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {
	
  loginStatus: function(){
     var myData = ajax.post('server/routes/login.php', query.stringify({
           phase: 'login_status'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });
       return myData;  
  },

  userData: function() {
    var myData = ajax.post('server/routes/userdata.php', query.stringify({
           phase: 'get_user_data'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });
       return myData;  
  },

  insertPostWithImage: function(userid, category, myFile, myText) {
    var data = new FormData();
        data.append('file', myFile);
        data.append('phase', 'insert_post_with_image');
        data.append('postText', myText);
        data.append('userid', userid);
        data.append('category', category);
    var myData = ajax.post('server/routes/dashboard.php', data);      
    
    return myData;
  },

  insertPostWithoutImage: function(userid, category, myText) {
      var myData = ajax.post('server/routes/dashboard.php', query.stringify({
           userid: userid,
           category: category,
           postText: myText,
           phase: 'insert_post_without_image'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });

      return myData;
  },

  getFollowingPosts: function(userid) {
      var myData = ajax.post('server/routes/dashboard.php', query.stringify({
           userid: userid,
           phase: 'get_following_posts'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });

      return myData;
  },

  getUserLikes: function(userid) {
      var myData = ajax.post('server/routes/dashboard.php', query.stringify({
           userid: userid,
           phase: 'get_user_likes'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
      });
      return myData; 
  },

  deletePost: function(userid, postid, image) {
     var myData = ajax.post('server/routes/dashboard.php', query.stringify({
           userid: userid,
           postid: postid,
           image: image,
           phase: 'delete_this_post'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });
      return myData; 
  },

  insertLike: function(loggedin_user_id, postid) {
      var myData = ajax.post('server/routes/dashboard.php', query.stringify({
           userid: loggedin_user_id,
           postid: postid,
           phase: 'insert_user_like'
       }), {
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
            }
       });
      return myData; 
  },

  get_notication_messages: function(userid) {
      var myData = ajax.post('server/routes/dashboard.php', query.stringify({
          userid: userid,
          phase: 'get_message_notifications'
      }), {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          }
      });
      return myData;
  }
} 


module.exports = API;