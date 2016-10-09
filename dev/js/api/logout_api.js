var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var API = {

    handleLogout: function() {
        var myData = ajax.post('server/routes/login.php', query.stringify({
            phase: "logout_user"
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return myData 
    },
} 


module.exports = API;