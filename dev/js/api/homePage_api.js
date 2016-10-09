var Actions = require('../actions/home_actions');
var query = require('querystring');
var ajax = require('axios');

var API = {
	myLoad: function(data) {
         var myArr = [];
         myArr.push(data);
      return myArr;
	},

	otherData: function (){
		var arr = ['Electronic', 'Classic Soul', 'Blues', 'fruit loops'];
		var items = arr.map(function(items){
           return items;
		});
        return items;
	},

	Home_Page_Posts: function(){
		var myData = ajax.post('server/routes/homepage.php', query.stringify({
            phase: "user_posts"
        }), {
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return myData
	},

} 


module.exports = API;