'use strict';

var React = require('react'),
    Actions = require('../../actions/inbox_actions'),
    Store = require('../../stores/inbox_store'),
    ReactDOM = require('react-dom'),
    Routes = require('../../routes'),
    Link = require('react-router').Link,
    History = require('react-router/lib/hashHistory');

   function getClass(el){ return document.getElementsByClassName(el) };

var MessagePanel = React.createClass({

	getInitialState: function() {
	    return {
	      panelContent: this.props.messageDeets     
	    };
	},

    handleTrash: function(id) {
       var userid = localStorage.userid;
       if(getClass('inboxOptions')) { 

        var postids = (function(postid){ return postid; })(id);        
   	    getClass('inbox_trash')[0].addEventListener('click', function(){
            Actions.handleTrash(postids, userid);    
   	    });
       	    
       } 
	},

	handleBehavior: function(id) {
        var checked = document.querySelectorAll('input:checked'),
            el = document.getElementById('wrap-'+id),
            that = this;
          
        (function(){
            if(el.children[0].checked === true) {
            	el.style.backgroundColor='#f9f7f7';
            	that.handleTrash(id);
	        } else {
	           el.style.backgroundColor='inherit';	
	        }
        })();

    // Make 'saved' and 'trash' options active if one or more checkboxes are checked
        (function() {
        	if(checked.length === 0) {
        		getClass('inboxOptions')[0].className = 'inboxOptions_inactive';
        	}
        	else {
        		if(getClass('inboxOptions_inactive')[0]) {
                    getClass('inboxOptions_inactive')[0].className = 'inboxOptions';
        		} 
        	}
        })();
	},
    

    thePanel: function(items) {
    	var that = this;
    	if(items.messaged_userid === items.messenger_userid) {
		        var theirname = 'Yourself';   
		} else {
	        var theirname = this.props.messenger_firstname + ' ' + this.props.messenger_lastname;
		}
    	var thePanel = (
         	<div className='messagePanel_wrap' id={'wrap-'+items.message_id} key={Math.random()}> 
	         <input type="checkbox" className='checkBox' ref='checkbox' onClick={that.handleBehavior.bind(that, items.message_id)}/>
		        <Link to={'profile/'+ items.messenger_userid} >
			        <div className='messagePanel_avatar'>
			        	<img src={'images/user_pics/'+items.messenger_avatar} />
			        </div>
		        </Link>
		        <div className='messageDetail_wrap'>
		            <div className='messagePanel_messageTitle'>
		           	  <strong>Title:</strong> {items.message_title}
		           </div>
		            <div className='messagePanel_from'>
		            	<strong>From:</strong> 
		            </div>
		        </div>
		        <br className='clear' />
	        </div>
        );
        return thePanel;
    },

	inboxPanel: function (clicked) {
		var that = this;

		 switch (clicked) {
            case undefined:
                var myPanel = this.props.messageDeets.map(function(items){
					return that.thePanel(items);
				});
            break;
            case 'sent':
            alert();
            console.log(this.props.sentMessageDeets);
                var myPanel = this.props.sentMessageDeets.map(function(items){
                	console.log(items);
					return that.thePanel(items);
				});
            break;
        }
		

	return myPanel;
	},


    /*mouseenter : function() {
		ReactDOM.findDOMNode(this).style.backgroundColor = '#f9f7f7';
	},

	mouseleave: function() {
        ReactDOM.findDOMNode(this).style.backgroundColor = 'inherit';
	},*/


	render: function() { 
		return (
             <div className='inboxWrap'>
            	<div className='inboxNavWrap'>
            		<div>Inbox</div>
	            		<div onClick={this.inboxPanel.bind(this, 'sent')}>Sent</div>
	            		<div className='inboxOptions_inactive'>
		            		<div className='inbox_trash'>Delete</div>
	            		</div>
            		<br className='clear' />
            	</div>
            	<div className='inboxBody'> 
            		{this.inboxPanel()}
            	</div>
	        </div>
		);
	}
});


module.exports = MessagePanel;