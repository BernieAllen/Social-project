'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    History = require('react-router/lib/hashHistory'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;

/* ...........................................................
 
    List of pages required for app
     
........................................................... */
var Home = require('./components/home/home_component'),
    Trending = require('./components/trending/trending_component'),
    Login = require('./components/login/login'),
    Register = require('./components/register/register'),
    Logout = require('./components/logout/logout'),
    Dashboard = require('./components/dashboard/dashboard'),
    Header = require('./components/headerBar/headerBar'),
    Settings = require('./components/user_settings/user_settings'),
    Profile = require('./components/userProfile/user_profile'),
    Business_Listings = require('./components/businessListingsMap/businessListings'),
    Inbox = require('./components/inbox/inbox');

/* ...........................................................
 
    Router output
     
........................................................... */




var app = React.createClass({
	render: function() {
       return (
       	<div>
       	<Header />
		  {this.props.children}
		 </div>
		);
	} 
});

var Routes = React.createClass({
	render: function() {
		return (
	       <Router history={History}>
	           <Route path="/" component={app} >
	               <IndexRoute component={Home} />
		           <Route path="/home" component={Home} />
		           <Route path="/trending" component={Trending} />
		           <Route path="/login" component={Login} />
		           <Route path="/logout" component={Logout} />
		           <Route path="/register" component={Register} />
		           <Route path="/dashboard" component={Dashboard} />
		           <Route path="/user_settings" component={Settings} />
                   <Route path="/business_listings" component={Business_Listings} />
		           <Route path="/profile" component={Profile}>
			           <Route path="/profile/:id" component={Profile}/>
			      </Route>
			      <Route path="/inbox" component={Inbox} />
	          </Route>		       
	       </Router>
	    )
	}
});



module.exports = Routes;