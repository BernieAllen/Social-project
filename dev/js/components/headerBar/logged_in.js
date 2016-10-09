var React = require('react');
var Actions = require('../../actions/headerBar_actions');
var Store = require('../../stores/headerBar_store');
var Link = require('react-router').Link;


function myClass(el) {
    return document.getElementsByClassName(el)[0];
};

function myId(el) {
    return document.getElementById(el);
}

var Logged_In = React.createClass({

    getInitialState: function() {
        return {
            toggle_panel: 'off'
        };
    },

    close_if_not_clicked: function() {
        var that = this;
        if (this.state.toggle_panel === 'on') {
            myId('app').addEventListener('click', function(e) {
                if (e.target.id !== 'check_class' && that.state.toggle_panel === 'on') {
                    that.setState({
                        toggle_panel: 'off'
                    });
                }
            }, false);
        }
    },

    toggle_dropdown_state: function() {
        if (this.state.toggle_panel === 'off') {
            var toggleState = 'on';
        }
        if (this.state.toggle_panel === 'on') {
            var toggleState = 'off';
        }
        this.setState({
            toggle_panel: toggleState
        });
    },

    hide_show: function() {
        var hide_show = '';
        var that = this;

        if (this.state.toggle_panel === 'on') {
            hide_show = 'toggle_dropDown';
            this.close_if_not_clicked();
        }
        if (this.state.toggle_panel === 'off') {
            hide_show = 'hide';
        }
        return hide_show;
    },

    render: function() {
        return (
            <div key={Math.random()}>
		     	<div className='headerbar_loggedin_ui'>
	                <span className='user_settings_dropdown'><img src={'images/user_pics/'+ this.props.avatar} onClick={this.toggle_dropdown_state}/></span>
	                <br className='clear'/>
                </div>
                <div className='headerBarSearch_wrap'>
                        <input type='text' className='headerBarSearch_field' placeholder=' Search' /><div className='searchIconWrap'><img src='images/icons/search.png' /></div>
                        </div>
                <div id='check_class' className={this.hide_show()}>
                    <ul>
                        <li><Link to='dashboard'>Home</Link></li>
                        <li><Link to={'profile/'+ this.props.user_id}>Profile</Link></li>
                        <li><Link to='user_settings'>Settings</Link></li>
                        <li><Link to='logout'>Logout</Link></li> 
                    </ul>
                    <br className='clear'/>
		        </div>
		    </div>
        );
    }
});

module.exports = Logged_In;