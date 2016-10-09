'use strict';

var React = require('react'),
    Actions = require('../../actions/userProfile_actions'),
    ReactRouter = require('react-router'),
    Store = require('../../stores/userprofile_store'),
    Routes = require('../../routes'),
    History = require('react-router/lib/hashHistory');


// Subcomponents
var User_Info_Aside = require('./user_info_aside'),
    User_Posts_Section = require('./user_posts_section');

var User_Profile = React.createClass({
    getInitialState: function() {
        return {
            pageUserData: [],
            pageUserPosts: [],
            pageUserFollowers: [],
            pageUserFollowing: [],
            pageUserLikes: [],
            loggedInUserData: [],
            pageUserId: '',
            isUserFollowed: '',
            loginStatus: Store.loginStatus()
        }
    },

    executeActions: function(page_userid, loggedin_userid) {
       
        // Reset state data before retrieving new data via "executeActions" 
        this.setState({ 
            pageUserData: [],
            pageUserPosts: [],
            pageUserFollowers: ' ',
            pageUserFollowing: ' ',
            pageUserLikes: ' ',
            loggedInUserData: [],
            pageUserId: '',
            isUserFollowed: ''
        });

        Actions.get_user_data(page_userid); //Get the information about the owner of this page
        Actions.get_post_data(page_userid); //Get the data related to the posts made by the user who this page belongs to
        Actions.get_profile_followers(page_userid); // The follwers of this profile
        Actions.get_profile_following(page_userid); // The people the own of this profile follows
        Actions.check_user_follows(loggedin_userid, page_userid); // Check to see if the logged in user follows the owner of this page
        Actions.get_user_likes(page_userid);
    },

    componentDidMount: function() {
        var page_userid = this.props.params.id; // Mounted component's id of the owner of the profile page
        var loggedin_userid = localStorage.userid;

        // Call function to fire off actions
        this.executeActions(page_userid, loggedin_userid); 

        Store.addChangeListener(this._profileData);
    },

     componentWillReceiveProps: function(nextProps) {
        var page_userid = nextProps.params.id; // nextProps id of the owner of the profile page
        var loggedin_userid = localStorage.userid;

        // re-execute page actions
        if (this.props.params.id !== nextProps.params.id) { 
            this.executeActions(page_userid, loggedin_userid);
        }
    },

    componentWillUnmount: function() {
        Store.removeChangeListener(this._profileData);
    },

    _profileData: function() {
        this.setState({
            pageUserData: Store.userData(),
            pageUserPosts: Store.userPosts(),
            pageUserFollowers: Store.userFollowers(),
            pageUserFollowing: Store.userFollowing(),
            pageUserLikes: Store.userLikes(),
            loggedInUserData: Store.loggedinUserData(),
            pageUserId: this.props.params.id,
            isUserFollowed: Store.isUserFollowed(),
            loginStatus: Store.loginStatus()
        });
    },

    user_info_aside: function() {
        return (           
            <User_Info_Aside key={Math.random()}
                userData = {this.state.pageUserData}
                loggedin_userid = {localStorage.userid}
                pageuser_id = {this.props.params.id}             
            />
        );
        return UserInfoAside
    },

    user_post_section: function() {
        return (
            <User_Posts_Section key={Math.random()}
                user_id = {this.state.pageUserId}
                userPosts={this.state.pageUserPosts}
                userFollowers={this.state.pageUserFollowers}
                userFollowing={this.state.pageUserFollowing}
                userLikes = {this.state.pageUserLikes}
                isUserFollowed={this.state.isUserFollowed}
                loginStatus={this.state.loginStatus}
            />
        );
    },

    render: function() {
        return (
            <div className='pageContainer' key={Math.random()}>
              {this.user_info_aside()}
              {this.user_post_section()}            
           </div>
        );
    }
});


module.exports = User_Profile;