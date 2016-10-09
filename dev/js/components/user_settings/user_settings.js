'use strict';

var React = require('react'),
    Actions = require('../../actions/usersettings_actions'),
    Store = require('../../stores/usersettings_store'),
    Routes = require('../../routes'),
    History = require('react-router/lib/hashHistory'),
    Link = require('react-router').Link;

var User_settings = React.createClass({
    getInitialState: function(){
       return {
        myUserData: Store.getAll(),
      }
    },
	componentDidMount: function() { 
       Store.addChangeListener(this._userData);
    },

    componentWillUnmount: function() {
       Store.removeChangeListener(this._userData);
    },

    /* Check user data before passing to server */
    updateSettings: function() {
    	var userid = document.getElementsByClassName('settingsContainer')[0].id, //user id stored on settingsContainer as id attribute
            firstname = this.refs.update_firstname.value,
            lastname = this.refs.update_lastname.value,
            email = this.refs.update_email.value,
            about = this.refs.update_about.value;
        if(firstname !== '' && lastname !== '' && email !== '') {
            Actions.update_basic_settings(firstname, lastname, email, about, userid);
        }
    },

    updatePassword: function() {
        alert('save password');
    },

	_userData: function() {
        this.setState({
            myUserData: Store.getAll()
        });

        if(Store.getAll().updatedDataStatus === 'Record updated successfully'){
            var that = this; 
            setTimeout(function(){
               that.refs.saved_status.className = 'status1_before';
            }, 1500);        
        }
	},

	render: function() {
	var that = this; 
	if(this.state.myUserData.loginStatus === 'is_logged_in') {

        if(Store.getAll().updatedDataStatus === 'Record updated successfully'){
            var showStatus = 'status1_after';        
        } else {
        	var showStatus = 'status1_before';
        }

		var myMarkup = this.state.myUserData.userData.map(function(items){
           return (
           	    <div className='pageContainer' id={items.user_id} key={Math.random()}>	           	    
                  <div className='display_user_info_wrap'>
                      <div className='display_user_info'>
                            <img src={'images/user_pics/' + items.avatar} className='display_user_avatar'/>
    	           	    </div>
                       	<div className='display_user_info'>
                       	   <div className='display_user_content'>
           	            	   	Basic settings: <br/>
           	            		<input type='text'  ref='update_firstname' placeholder=' Update Firstname' defaultValue={' '+items.firstname.trim()}/><br/>
           	            		<input type='text'  ref='update_lastname' placeholder = ' Update Lastname' defaultValue={' '+items.lastname.trim()}/><br/>
           	            		<input type='text' ref='update_email' placeholder = ' Update Email' defaultValue={' ' + items.email}/><br/>
                                <textarea ref='update_about' defaultValue={' '+items.about.trim()}></textarea>
           	            		<br/>
           	            		<button onClick={that.updateSettings}>Save Changes</button> <span ref='saved_status' className={showStatus}>Saved!</span>
                       	   </div>
                       	</div>
                       	<div className='display_user_info'>
           	            	<div className='display_user_content'>
           	            	  Update password: <br/>
           	            		<input type='text' placeholder=' Current password' /><br/>
           	            		<input type='text'  placeholder = ' New password' /><br/>
           	            		<input type='email' placeholder = ' Confirm password' /><br/><br/>
           	            		<button onClick={that.updatePassword}>Save Changes</button>
           	            	</div>
                       	</div>
                    </div>
                  <br className='clear' />
                </div>
            );
		});
	} else
	if(this.state.myUserData.loginStatus === 'not_logged_in') {
		History.push('/home');
	}  		
    return (
    	<div>
    	 {myMarkup}
        </div>);
	}
});

module.exports = User_settings;