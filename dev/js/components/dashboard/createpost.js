'use strict';
var React = require('react');
var Actions = require('../../actions/dashboard_actions');
var Store = require('../../stores/dashboard_store');
var Link = require('react-router').Link;
var History = require('react-router/lib/hashHistory');



var createPost = React.createClass({

    getInitialState: function() {
        return {
            textarea: 'createpost_textarea_close',
            category: 'createPostCategory_hide',
            postbutton: 'createPostButton_hide',
            uploadPicButton: 'uploadPicButton_hide',
            savedPostSuccess: '',
            uploadPicIcon: 'images/icons/add_pic.png',
            linkIcon: 'upLoadLinkIcon_hide',
            uploadPicIconStyle: 'picNotSelected'
        };
    },

    componentDidMount: function() {
        Store.addListener("change", this._closePostForm);
    },

    componentWillUnmount: function() {
        Store.removeListener("change", this._closePostForm);
    },

    createPost: function() {
        if (this.refs.postTextarea.value.length > 3) {
            var userid = localStorage.userid,
                myText = this.refs.postTextarea.value,
                myFile = this.refs.includePic.files[0],
                category = this.refs.createPostCategory.value;

            if (myFile !== undefined && myFile.type.match(/image/g)) {
                Actions.post_with_image(userid, category, myFile, myText);
            } else
            if (myFile === undefined && myText.value !== '') {
                Actions.post_without_image(userid, category, myText);
            }
        }
    },

    
    readImageFile: function() {
        var that = this;
        var myFile = this.refs.includePic.files[0];

        if (myFile !== undefined && myFile.type.match(/image/g)) {
              //Create file reader object
              var reader = new FileReader();
              //File reader onload, append the selected image where it is to be displayed
              reader.onload = function(){
                var displayImage = reader.result;
                that.setState({
                    uploadPicIcon: displayImage,
                    uploadPicIconStyle: 'picSelected' 
                })
              };
              //Read the the selected image
              reader.readAsDataURL(myFile);                
        }
    },

    _closePostForm: function() {
        var that = this;
        this.setState({
            savedPostSuccess: Store.postInsertSuccess(),
        });

        if (this.state.savedPostSuccess === 'all_good') {
            that.refs.postTextarea.value = ''; // Clear textarea
            this.refs.createPostCategory.value = '';
            setTimeout(function() { //Reset Post form
                that.setState({
                    textarea: 'createpost_textarea_close',
                    category: 'createPostCategory_hide',
                    postbutton: 'createPostButton_hide',
                    uploadPicButton: 'uploadPicButton_hide',
                    savedPostSuccess: '',
                    uploadPicIcon: 'images/icons/add_pic.png',
                    linkIcon: 'upLoadLinkIcon_hide',
                    uploadPicIconStyle: 'picNotSelected'
                });
            }, 100);
        }
    },

    animateTextarea: function() {
        this.setState({
            textarea: 'createpost_textarea_open',
            category: 'createPostCategory_show',
            postbutton: 'createPostButton_show',
            uploadPicButton: 'uploadPicButton_show',
            linkIcon: 'upLoadLinkIcon_show'
        });
    },

    render: function() {
        return (
            <div className='createpost_wrap'> 
                <div>
                  <select ref="createPostCategory" className={this.state.category + ' selectpicker btn dropdown-toggle btn-default'} tabIndex="3">
                        <option value=""> Choose Category </option>
                        <option value="Fitness">Fitness</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Sport">Sport</option>
                        <option value="Yoga">Yoga</option>     
                  </select>
                  <textarea ref='postTextarea' className={this.state.textarea + ' form-control'} onClick={this.animateTextarea} placeholder=' Anything inspiring to share?'></textarea><br/>
                    <form ref='uploadPicButton' className={this.state.uploadPicButton + ' uploadPicButton_hide'} encType='multipart/form-data' method='POST'>
                        <label id='inputWrap'>
                          <span className={this.state.uploadPicIconStyle}><img src={this.state.uploadPicIcon} /></span><input type='file' name='includePic' ref='includePic' className='includePic' onChange={this.readImageFile} style={{display:'none'}}/>
                        </label>
                    </form>
                   <span className={this.state.linkIcon}><img src='images/icons/add_link.png' /></span>
                   <button ref='createPostButton' className={this.state.postbutton} onClick={this.createPost}>Create Post</button>
              </div>
          </div>
        );
    }
});

module.exports = createPost;