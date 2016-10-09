'use strict';
var React = require('react');
var Actions = require('../../actions/userlikes_actions');
var Store = require('../../stores/userlikes_store');
var Link = require('react-router').Link;
var History = require('react-router/lib/hashHistory');



var NewsFeed = React.createClass({
    getInitialState: function(){
        return {
            loggedinUserLikes: ''
        }
	},



    _getUserLikes: function() {
        this.setState({
            loggedinUserLikes: Store.loggedinUserPostLikes()
        });
    },


    render: function() {
        return (
            <span>
               <img className='myLikeIcon' src='images/icons/likeitNotActive.png' />  
            </span>
        );
    }
});


module.exports = NewsFeed;