var Actions = require('../actions');
var query = require('querystring');
var ajax = require('axios');

var Inbox = {

    getInboxMessages: function(userid) {
        var myData = ajax.post('server/routes/inbox.php', query.stringify({
            userid: userid,
            phase: "get_messages"
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return myData; 
    },

    getSentMessages: function(userid) {
        var myData = ajax.post('server/routes/inbox.php', query.stringify({
            userid: userid,
            phase: "get_sent_messages"
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return myData; 
    },

    handleInboxTrash: function(postid, userid) {
        var myData = ajax.post('server/routes/inbox.php', query.stringify({
            postid: postid,
            userid: userid,
            phase: "handle_trash"
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return myData; 
    }
} 


module.exports = Inbox;