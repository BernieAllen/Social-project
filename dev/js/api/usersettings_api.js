var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {

  updateSettings: function(firstname, lastname, email, about, userid) {
       var myData = ajax.post('server/routes/updatesettings.php', query.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            about: about,
            userid: userid,
            phase: "update_settings"
       }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
       });
       return myData 
    }
} 


module.exports = API;