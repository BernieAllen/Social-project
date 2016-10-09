var React = require('react');
var Actions = require('../../actions/headerBar_actions');
var Store = require('../../stores/headerBar_store');
var If_Logged_In = require('./logged_in');
var Link = require('react-router').Link;

var HeaderBar = React.createClass({

	getInitialState: function(){
        return {
            login_status: [],
            user_data:''
        }
	},
	componentDidMount: function() {
        Actions.get_user_data();
        Actions.get_login_status();
        Store.addListener("change", this._headerBar_data);
	},

	componentWillUnmount: function() {
		Store.removeListener("change", this._headerBar_data);
	},

	_headerBar_data: function() {
        this.setState({
       	   login_status: Store.loginStatus(),
       	   user_data: Store.userData()
        }); 

      if(this.state.login_status === "is_logged_in" && this.state.user_data !== undefined) {
	      	this.state.user_data.map(function(items){ // store logged in user's id in local storage so it can be used throughout the site if needed
	            localStorage.userid = items.user_id;
	        });
	        require('../../actions/dashboard_actions').get_following_posts(localStorage.userid);
      }
	},

	render: function() {
		if(this.state.login_status === "is_logged_in" && this.state.user_data !== '') {
			var myUserData = this.state.user_data;
			if(myUserData !== '') {
                var myStatus = myUserData.map(function(items) {
                    var myUI = (
                    	<If_Logged_In 
			                key={Math.random} 
			                firstname={items.firstname} 
			                lastname={items.lastname}
			                avatar={items.avatar}
			                user_id={items.user_id}                                 
	                    />
	                )			
	            return myUI
			});
			}
		} else {
            var myStatus = (
	            <div className='loginRegisterButtons_wrap'>
		            <Link to="login"><button className='loginRegisterButton'>Login</button></Link>
		            <Link to="/register"><button className='loginRegisterButton'>Signup</button></Link>
		            <br/><br/>
	            </div>
            );
		}
        return (
	     	<nav className="top-bar headerBar" data-topbar role="navigation" key={Math.random()}>
		         <div className="container-fluid">
		            <Link to="app" className="nav-logo">
		                <img src="images/logo.jpg" />
		            </Link>
		            <span className="siteTitle">Good Vibes.com</span>
		            <ul className="headerNav_left"> 
		               <li><Link to="home">Latest</Link></li>
		               <li><Link to='business_listings'>Listings</Link></li>
		               <li><Link to="trending">Trending</Link></li>
		               <li><Link to="fitness">Fitness</Link></li>
		            </ul> 
		            <ul className="headerNav_right">
		                {myStatus}
		            </ul>
		         </div>
		     </nav>
	    );
	}
});

module.exports = HeaderBar;


