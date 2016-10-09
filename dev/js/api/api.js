var Actions = require('../actions');
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

	realAsync: function(){
		var myData = ajax.get('server/controllers/mainController.php');
        return myData
	},

} 


module.exports = API;