'use strict';
var React = require('react');
var Actions = require('../../actions/logout_actions');
var Store = require('../../stores/logout_store');
var Change_headerBar_status = require('../../actions/headerBar_actions');
var History = require('react-router/lib/hashHistory');



var Logout = React.createClass({
	 getInitialState: function(){
       return {
        session: []
      }
    },

    /*componentWillMount: function() { 
       Store.addListener("change", this._logoutData);
    },*/
 
	componentDidMount: function() { 
    Store.addListener("change", this._logoutData);
       Actions.handleLogout();
       	  setTimeout(function(){
            History.push('/home');
            delete localStorage.userid;
            location.reload();
	       }, 200); 
    },

     componentWillUnmount: function() {
       Store.removeChangeListener(this._logoutData);
    },
    
    _logoutData: function() {
        this.setState({
         session: Store.serverAction()
      });
    },
   


	render: function() {      
		return (
           <div>Logging out </div>
		);
	}
});


module.exports = Logout;