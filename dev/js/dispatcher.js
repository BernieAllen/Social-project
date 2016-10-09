var Assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;


//module.exports = new Dispatcher();


var MyDispatcher = Assign(new Dispatcher(), {
	handleViewAction: function(action){
		this.dispatch({
			source: "SaveData",
			action: action
		});
	},

	handleAPIAction: function (action){
        this.dispatch({
			source: "GotData",
			action: action
		});
	},
});

module.exports = MyDispatcher;
