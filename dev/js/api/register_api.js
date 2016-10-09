var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {

  registerUser: function(firstname, lastname, email, password) {
       var myData = ajax.post('server/routes/register.php', query.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phase: "register_user"
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
       return myData;
    }
} 


module.exports = API;