var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {

  handle_login: function(email, password) {
       var myData = ajax.post('server/routes/login.php', query.stringify({
           email: email,
           password: password,
           phase: "login_user"
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
       return myData 
    }
} 


module.exports = API;