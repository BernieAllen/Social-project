'use strict';

var React = require('react'),
    Actions = require('../../actions/userProfile_actions'),
    ReactRouter = require('react-router'),
    Store = require('../../stores/userprofile_store'),
    Routes = require('../../routes'),
    History = require('react-router/lib/hashHistory'),
    Link = require('react-router').Link;

function $(el) { // shorthand to get element class
    return document.getElementsByClassName(el);
}

function _(el) { // shorthand to get element id
    return document.getElementById(el);
}


var user_info_aside = React.createClass({

    userLikes: function() {
        var myLikes = this.props.userLikes.map(function(items){
        if(items.image !== '') {
            var postimage = (<img src={'images/post_pics/'+ items.postimage} />);
        }

        return ( 
            <div className='user_post_wrap' key={Math.random()}>
                <div className='user_post_image_container'>
                    { postimage }
                </div> 
                <div className='user_post_header_container'>{items.posttext}</div>   
            </div>
        );
      });

      return myLikes;
    },

    userPosts: function() {
        if (this.props.userPosts.length > 0) {
            var myUserPost = this.props.userPosts.map(function(items) {
                if(items.image !== '') {
                    var postimage = (<img src={'images/post_pics/'+ items.image} />);
                }

                return (
                    <div className='user_post_wrap' key={Math.random()}>
                        <div className='user_post_image_container'>
                          { postimage }
                        </div> 
                        <div className='user_post_header_container'>{items.text}</div>   
                    </div>
                )
            });
        }
        return myUserPost;
    },

    userFollowers: function() {
        var follower_deets = '';
        if (this.props.userFollowers.length > 0) {
               follower_deets = this.props.userFollowers.map(function(items) {
                return (
                    <div className='user_post_wrap' key={Math.random()}>
                        <Link to={'profile/'+ items.user_id}>
                            <div className='user_post_header_container'>
                                {items.follower_firstname} {items.follower_lastname}
                            </div>
                            <div className='user_post_image_container'>
                              <img src={'images/user_pics/'+ items.follower_avatar} width='40'/>
                            </div>
                        </Link>
                    </div>
                );
            });
        } else {
                follower_deets = (
                    <div className='profile_not_something'> 
                         No followers
                    </div>
                )
        }
        return follower_deets;
    },

    userFollowing: function() {
        console.log(this.props.userFollowing.length);
        var follower_deets = '';
        if (this.props.userFollowing.length > 0) {
               follower_deets = this.props.userFollowing.map(function(items) {
                return (
                    <div className='user_post_wrap' key={Math.random()}>
                        <Link to={'profile/'+ items.user_id}>
                            <div className='user_post_header_container'>
                                {items.follower_firstname} {items.follower_lastname}
                            </div>
                            <div className='user_post_image_container'>
                              <img src={'images/user_pics/'+ items.follower_avatar} width='40'/>
                            </div>
                        </Link>
                    </div>
                );
            });
        } else {
                follower_deets = (
                    <div className='profile_not_something'> 
                        Not following 
                    </div>
                );
        }
        return follower_deets;
    },

    getInitialState: function() {
        return {
            profile_content: this.userPosts()
        }
    },

    componentDidMount: function() {
        var followed_id = this.props.user_id,
            follower_id = localStorage.userid;

        //Hide 'follow button' if user is on their own profile page
        if (followed_id === follower_id) {
            $('the_follow_butt')[0].style.display = 'none';
        }
        if (this.props.loginStatus === '' || this.props.loginStatus === 'not_logged_in') {
            $('the_follow_butt')[0].style.display = 'none';   
        }
        //Create initial underline beneath post-nav item onload
        _('posts').style.borderBottom = '1px solid black';
    },

    callContentComponent: function(clicked) {

        
        (function(){ // Create an undeline beneath the clicked nav item
            var clickedItem = clicked;
            function compare_then_underline(items) {
                clickedItem.trim() == items.trim() ? _(items).style.borderBottom = '1px solid black' : _(items).style.borderBottom = 'none';
            }
            var content_nav = $('_click');
            for (var i = 0; i < content_nav.length; ++i) {
                compare_then_underline(content_nav[i].id);
            }
        })();
        

        // Route in the users page content section
        var myComp = '';
        switch (clicked) {
            case 'posts':
                myComp = this.userPosts();
                break;
            case 'followers':
                myComp = this.userFollowers();
                break;
            case 'following':
                myComp = this.userFollowing();
                break;
            case 'liked':
                myComp = this.userLikes();
                break;
        }

        this.setState({
            profile_content: myComp
        });
    },

    follow_status: function(follow) {
        var followed_id = this.props.user_id,
            follower_id = localStorage.userid;

        switch (follow) {
            case 'follow':
                Actions.insert_the_follow(followed_id, follower_id);
                break;
            case 'unfollow':
                Actions.unFollow_this_user(followed_id, follower_id);
                break;
        }
    },

    render: function() {

    // Follow Button logic
        var myButtData = ''
        if (this.props.isUserFollowed === 'user_is_followed') {
            myButtData = {
                follow: 'unfollow_user_button',
                followCall: this.follow_status.bind(this, 'unfollow'),
                buttText: 'Following'
            }
        }
        if (this.props.isUserFollowed === 'user_is_not_followed') {
            myButtData = {
                follow: 'follow_user_button',
                followCall: this.follow_status.bind(this, 'follow'),
                buttText: 'Follow'
            }
        }
        if (this.props.isUserFollowed === '') {
            myButtData = {
                follow: 'hideElement'
            }
        }

        return (
            <span>
              <div className='profilepage_user_posts_section'>
                    <div className='user_stats'>
                       <ul>
                          <li id='posts' className='_click' onClick={this.callContentComponent.bind(this, 'posts')}>
                               Posts ({this.props.userPosts.length})
                          </li>
                          <li id='followers' className='_click' onClick={this.callContentComponent.bind(this, 'followers')}>
                              Followers ({this.props.userFollowers.length})
                          </li>
                          <li id='following' className='_click' onClick={this.callContentComponent.bind(this, 'following')}>
                              Following ({this.props.userFollowing.length})
                          </li>
                          <li  id='liked' className= '_click' onClick={this.callContentComponent.bind(this, 'liked')}>
                              Liked ({this.props.userLikes.length})
                          </li> 
                          <button className={myButtData.follow +' the_follow_butt'} onClick={myButtData.followCall}> {myButtData.buttText} </button>                     
                       </ul>
                    </div><br/>
                    <div ref='profile_user_content' className='profile_user_content'><span>{this.state.profile_content}</span></div>
                  <br className='clear' />
              </div>
          </span>
        );
    }

});


module.exports = user_info_aside;