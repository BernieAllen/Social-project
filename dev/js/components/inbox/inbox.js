'use strict';

var React = require('react');
var Actions = require('../../actions/inbox_actions');
var Store = require('../../stores/inbox_store');
var Routes = require('../../routes');
var History = require('react-router/lib/hashHistory');

/* Components */
var MessagePanel = require('./messagePanel');

var Inbox = React.createClass({

	getInitialState: function() {
	    return {
	        myMessages: Store.getMessages(),
	        sentMessages: Store.getSentMessages()
	    };
	},

	inboxPanel: function() {
     console.log(this.state.sentMessages);
	    var myMessage = <MessagePanel 
           messageDeets = {this.state.myMessages}
           sentMessageDeets = {this.state.sentMessages}  
	    />;
       return  myMessage;
	},

	componentDidMount: function() {
        Actions.getMessages(localStorage.userid);
        Actions.getSentMessages(localStorage.userid);
        Store.addChangeListener(this._inboxData);
	},

    componentWillUnmount: function() {
        Store.removeChangeListener(this._inboxData);
    },

	_inboxData: function() {
		this.setState({
			myMessages: Store.getMessages()
		});
	},

	render: function() {
      
		return (
	        <div className='pageContainer'> 
	            {this.inboxPanel()}
	        </div>
		);
	}
});


module.exports = Inbox;