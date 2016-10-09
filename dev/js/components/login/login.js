'use strict';

var React = require('react');
var Actions = require('../../actions/login_actions');
var Store = require('../../stores/login_store');
var Routes = require('../../routes');
var History = require('react-router/lib/hashHistory');

// Initiate Dashboard page calls
var Change_headerBar_status = require('../../actions/headerBar_actions');

var Login = React.createClass({
    getInitialState: function(){
       return {
        status: "",
      }
    },

	login_val: function() {
		var email = this.refs.login_email.value,
		    password = this.refs.login_password.value,
		    status = "";

		if(email === "" ){		  
           status = "Email";
		} else
		if(password === "") {
        status = "Password";
		}
		else {   

        Actions.handleLogin(email.trim(), password.trim());
		}
		this.setState({
        status: status
    });

	},

	componentDidMount: function() { 
       Store.addChangeListener(this._loginData);
    },

    componentWillUnmount: function() {
       Store.removeChangeListener(this._loginData);
    },


	_loginData: function() {
        if(Store.login_user() === 'logging_in'){    	
            this.setState({
              status: 'Thank you',
            });
            /* 
               Trigger header bar actions 
               header bar actions make the call to the server to retrieve user data and login status for the rest of the app  
            */ 
            if(this.state.status === 'Thank you') {
              Change_headerBar_status.get_login_status();
              Change_headerBar_status.get_user_data();             

              History.push('/dashboard'); // Redirect user to their dashboard
            }

	      }
	},

	render: function() {
      
		return (
           <div key={Math.random()} className='loginRegister_wrap'>
              <input type='text' ref='login_email' className="form-control" placeholder=' Email'/>
              <input type='password' ref='login_password'  className="form-control" placeholder=' Password'/>
              <button onClick={this.login_val}>Login</button>
              <span ref="status">{this.state.status}</span>
           </div>
		);
	}
});


module.exports = Login;