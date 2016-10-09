'use strict';
var React = require('react');
var Actions = require('../../actions/dashboard_actions');
var Store = require('../../stores/dashboard_store');
var Link = require('react-router').Link;



var leftside = React.createClass({

   componentDidMount: function() {
       
       /*function checkit(){
          setTimeout(function(){
              console.log('shoes');
              checkit();
          }, 300000);
       }

       checkit();*/
   },

    render: function() {
        var userInfo = this.props.userdata.map(function(items) { 
                return (
                  <div className="display_user_info" key={Math.random()}>
                      <img src={"images/user_pics/"+ items.avatar} className='display_user_avatar'/>
                      <div className="dashboard_username">Hi {items.firstname +" "+items.lastname}!</div>
                  </div>
                );
            });

		return (

        <div className='display_user_info_wrap' key={Math.random()}>
            {userInfo}
            <div className="display_user_info">
               <Link to='inbox' className='profile_notifications'>
                    <img src='images/icons/messages.png'  /> 
                    Inbox (<span className='inboxCount'>{this.props.inbox}</span>) 
               </Link> <br/>
               <Link to='#' className='profile_notifications'><img src='images/icons/challenges.png' /> Issue a Challenge</Link> <br/>
               <Link to='#' className='profile_notifications'><img src='images/icons/goals.png'  />Set a Goal</Link> <br/>
            </div>
        </div>
        
	   );
	} 
});

module.exports = leftside;