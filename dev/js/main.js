'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./routes');
var Router = require('react-router').Router;
var Header = require('./components/headerBar/headerBar');

var App = React.createClass({

	render: function() {
		return (
		<div className="appContainer">
          <Routes/>
          <br className="clear" />
		</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));