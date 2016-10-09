var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {
	
  loginStatus: function(){
     var myData = ajax.post('server/routes/login.php', query.stringify({
           phase: "login_status"
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
       return myData  
  },

  userData: function(){
    var myData = ajax.post('server/routes/userdata.php', query.stringify({
           phase: "get_user_data"
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
      return myData  

  }
} 


module.exports = API;