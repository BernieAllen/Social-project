'use strict';

var React = require('react'),
    Actions = require('../../actions/userProfile_actions'),
    ReactRouter = require('react-router'),
    Store = require('../../stores/userprofile_store'),
    Routes = require('../../routes'),
    History = require('react-router/lib/hashHistory');


function _class(el) { return document.getElementsByClassName(el)[0] }


var user_info_aside = React.createClass({

    hideDialog: function() {
      this.refs.modalwrap.className = 'hide';
    },

    showDialog: function() {
        if(!document.getElementsByClassName('loginRegisterButtons_wrap')[0]){
            this.refs.modalwrap.className = 'dialogBoxWrapMessage';
        }
    },

    handleDialogBoxBehavior: function() {
        var that = this;
        _class('dialogboxbody').className = 'dialogboxbody_hide';
        _class('dialogAvatar').style.display = 'none';
        _class('dialogboxhead').innerHTML = '<br/> <strong>Message Sent!</strong>';
        setTimeout(function(){
           that.hideDialog();
           _class('dialogboxbody_hide').className = 'dialogboxbody';
           _class('dialogAvatar').style.display = 'inherit';
           _class('dialogboxhead').innerText = '';
           that.refs.messageTitle.value = '';
           that.refs.modal_message.value = '';
        }, 1500);
    },

    handleMessage: function(messaged_id, messenger_id) {
        if(this.refs.modal_message.value !== '') {
            var messageTitle = this.refs.messageTitle.value;
            var message = this.refs.modal_message.value;
            Actions.handleDialogMessageInsert(message, messageTitle, messaged_id, messenger_id);
        }
        this.handleDialogBoxBehavior();
    },

    displayUserData: function() {
       var that = this;
       var myUI = this.props.userData.map(function(items){
            return (

                <section className='display_user_info_wrap' key={items.user_id}>
                    <div ref='modalwrap' className='hide'>
                        <div id="dialogoverlay" className="dialogoverlay" onClick={that.hideDialog}></div>                      
                        <div className='dialogbox'>
                        <span className='dialogAvatar'><img src={'images/user_pics/'+ items.avatar} /></span>
                        <span className='closeDialog' onClick={that.hideDialog}>X</span>
                            <div>
                                <div className="dialogboxhead"></div> <br/>
                                <div className="dialogboxbody">
                                <div className='message_input_and_butt'>
                                    <input type='text' className='messageTitle' ref='messageTitle' placeholder=' Message Title' />
                                    <textarea className='dialog_message_input form-control' ref='modal_message' placeholder=' Type your message'></textarea><br/>
                                    <button onClick={that.handleMessage.bind(that, items.user_id, that.props.loggedin_userid)}>Send!</button><br className='clear'/>
                                </div>
                                <br/>
                                <br className='clear'/>
                                </div>                               
                            </div>  
                        </div>
                    </div>


                    <div className='display_user_info'>
                      <img src={'images/user_pics/'+ items.avatar} className='display_user_avatar'/>
                    </div>
                    <div className='display_user_info'>
                        <button> Challenge! </button><button onClick={that.showDialog}> Message </button>
                    </div>
                    <div className='display_user_info'>
                        <div className='display_user_name'><strong>{items.firstname} {items.lastname}</strong></div>
                        <div className='display_user_about'> {items.about} </div>
                    </div>
                </section>
            );
        });
      return myUI;  
    },
	render: function() {
		return (
            <span>
                {this.displayUserData()}
            </span>
		);
	}
  
});


module.exports = user_info_aside;