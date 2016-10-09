'use strict';
var React = require('react');
var Actions = require('../../actions/dashboard_actions');
var Store = require('../../stores/dashboard_store');
var Link = require('react-router').Link;
var History = require('react-router/lib/hashHistory');


function myClass(el) {
    return document.getElementsByClassName(el)[0];
};

function myId(el) {
    return document.getElementById(el);
}

/* Modal component */
var Modal = require('./modal');

var NewsFeed = React.createClass({

    getInitialState: function() {
        return {
          deletePostid: '',
          deleteImage: ''
        };
    },
    
    hideDialog: function() {
       this.refs.modalwrap.className = 'hide';
    },

    handleEdit: function(postid) {
        console.log('sugar cakes');
    },

    deletePost: function(postid) {
        
        Actions.delete_post(this.props.loggedin_userid, postid);

            this.refs.modalwrap.className = 'hide'; 
            this.refs.modalimage.src = '';
            this.refs.modaltext.innerText = '';         
      
    },

    handleDelete: function(postid, posttext, postimage) {
         /*this.setState({
            showDialog: 'dialogBoxWrap'
         });*/
         myId(postid).className = 'hide'; // dropdown list

         this.setState({
             deletePostid: postid,
             deleteImage: postimage
         });
         this.refs.modalwrap.className = 'dialogBoxWrap';
         this.refs.modalimage.src = 'images/post_pics/'+postimage;
         this.refs.modaltext.innerText = posttext;
    },

    handleMoreOptions: function(postid) {   // Toggle 'More options'  
        var theClass = myId(postid).className;
        if(theClass === 'hide') {
            myId(postid).className = 'newsfeed_dropdown';
        }
        if(theClass === 'newsfeed_dropdown') {
            myId(postid).className = 'hide';
        }
    },

    handleLikeAction: function(postid) {
       Actions.insert_like(this.props.loggedin_userid, postid);      
    },
        
    newsfeedUI: function() { 

        var ui = this.props.newsfeed_post_data.map(function(items) {
            if(items.liked === 'liked'){
                var liked = 'images/icons/likeitActive.png';
            } else {
                var liked = 'images/icons/likeitNotActive.png';
            }
            if (items.postimage !== '') {
                var postImage = (<img src={'images/post_pics/'+ items.postimage} width='400'/>);
            }
            if(this.props.loggedin_userid === items.user_id) {
                var editDelete = (
                    <span>
                        <li onClick={this.handleEdit.bind(this, items.post_id)}>Edit post</li> 
                        <li onClick={this.handleDelete.bind(this, items.post_id, items.posttext, items.postimage)}>Delete post</li>
                    </span>
                );
            }
            

            return (
                <div className='newsfeed_item_wrap' key={items.post_id}>
                {/* Modal markup */}
                    <div ref='modalwrap' className='hide'>
                        <div id="dialogoverlay" className="dialogoverlay" onClick={this.hideDialog}></div>
                            <div className='dialogbox'>
                                <div>
                                    <div className="dialogboxhead"></div> <br/>
                                    <div className="dialogboxbody">
                                    <div ref='modaltext'></div><br/>
                                      <img ref='modalimage' src='' width='190'/>
                                     <br/><br/>
                                    <button onClick={this.hideDialog}>Cancel</button><button onClick={this.deletePost.bind(this, this.state.deletePostid, this.state.deleteImage)}>Delete</button>
                                    </div> <br/>
                                    <div id="dialogboxfoot" className="dialogboxfoot">
                                       <br className="clear" />
                                    </div>
                                </div>  
                            </div>
                    </div>
                     
                {/* The poster's avatar pic */}
                    <div className='poster_profilepic'>
                        <Link to={'profile/'+ items.user_id}>
                            <img className='their_avatar' src={'images/user_pics/'+ items.profilepic } />
                        </Link>
                    </div>

                    <div className='post_content_wrap'>

                {/* The posts actual content */}
                        <div className='postWrap_text'>
                            <div className='poster_name'>
                                <Link to={'profile/'+ items.user_id }>{items.firstname} {items.lastname}</Link> <span className='postDateTime'>{items.date}</span>
                            </div><br/>
                            <div className='poster_posttext'> {items.posttext} </div>
                        </div>
                        <div className='post_image'> {postImage}</div>
                       
                {/* More options dropdown list items */}
                        <div className='commentOptions newsfeedicon'>
                            <img className='myRepostIcon ' src='images/icons/commentNotActive.png' /> 
                        </div>
                        <div className='likeThis newsfeedicon'  onClick={this.handleLikeAction.bind(this, items.post_id)}>
                            <img className='myLikeIcon' src={liked} />                          
                        </div>
                        <div className='repostThis newsfeedicon'>
                            <img className='myRepostIcon ' src='images/icons/repostNotActive.png' /> 
                        </div>
                        <div className='moreOptions newsfeedicon'>
                            <img className='myRepostIcon ' src='images/icons/moreNotActive.png' onClick={this.handleMoreOptions.bind(this, items.post_id)} />

                            <div id={items.post_id} className='hide'>
                                <ul>
                                    { editDelete }
                                    <li><Link to='user_settings'>Copy post link</Link></li>
                                </ul>
                                <br className='clear'/>
                            </div> 
                        </div>
                    </div>
                    <br className='clear' />
                </div>
            );
        }, this);
        return ui;
    },

    render: function() {
        return (
            <div className='newsfeed_wrap'>
               {this.newsfeedUI()}
            </div>
        );
    }
});


module.exports = NewsFeed;