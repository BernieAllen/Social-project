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

var Modal = React.createClass({


    render: function() {
        return (        
            <div id="dialogbox" className='dialogbox'>
                <div>
                    <div id="dialogboxhead" className="dialogboxhead">Permanently Delete this post? </div> <br/>
                    <div id="dialogboxbody" className="dialogboxbody"><button>Cancel</button><button>Delete</button></div> <br/>
                    <div id="dialogboxfoot" className="dialogboxfoot">
                       <br className="clear" />
                    </div>
                </div>  
            </div>
           
        );
    }
});


module.exports = Modal;