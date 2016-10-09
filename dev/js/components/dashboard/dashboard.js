'use strict';
var React = require('react'),
    Actions = require('../../actions/dashboard_actions'),
    Store = require('../../stores/dashboard_store'),
    Link = require('react-router').Link,
    History = require('react-router/lib/hashHistory');

/*  Components that make up the Dashboard */
   var Leftside = require('./leftside'),
       CreatePost = require('./createpost.js'),
       NewsFeed = require('./newsfeed.js');

/*  Components that make up the Dashboard */

var timeout = '';

var Dashboard = React.createClass({

	getInitialState: function(){
        return {
            userData: Store.userData(),
            newfeedPosts: [],
            privateMessages: [],
        }
	},

    createPost: function() {
     if(Store.loginStatus() === 'is_logged_in') {
        return (
           <CreatePost />
        );
     }
  },

  newsFeed: function() {  
    if(Store.loginStatus() === 'is_logged_in') {
        return (
           <NewsFeed 
              newsfeed_post_data = {this.state.newfeedPosts}
              loggedin_userid = {localStorage.userid}
           />
        )
    }
  },

  dashboardLeftSide: function() {
    if(Store.loginStatus() === 'is_logged_in') {
        if(this.state.userData !== '') {       
          var left = <Leftside key={Math.random()} 
                      userdata = {this.state.userData}
                      inbox = {this.state.privateMessages} 
          />;      
        }
    }
    return left;        
  },

  dashboard: function() {
    return (
      <div className='pageContainer'> 
            {this.dashboardLeftSide()}
            <div className='newsFeedAndPostWrap'>
                { this.createPost() }
                { this.newsFeed() }
            </div>
      </div>
    );
         
  },

	componentDidMount: function() {
      Actions.get_following_posts(localStorage.userid); 

      window.clearTimeout(timeout);
      timeout = setTimeout(function(){
          Actions.messages_notifications(localStorage.userid);
      }, 35);

      Store.addListener('change', this._dashboardData);
    },

  componentWillUnmount: function() {
        Store.removeListener('change', this._dashboardData);
  },

	_dashboardData: function(){  
    		this.setState({
             userData: Store.userData(),
             newfeedPosts: Store.newsfeedPosts(),
             privateMessages: Store.privateMessages(),
        });
	},

	render: function() {
		return (
      <div>
       {this.dashboard()}
      </div>
	   );
	} 
});

module.exports = Dashboard;