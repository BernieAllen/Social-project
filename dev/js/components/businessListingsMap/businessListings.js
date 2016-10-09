var React = require('react');
var Actions = require('../../actions/home_actions');
var Store = require('../../stores/home_store');
var Link = require('react-router').Link;


var BusinessListings = React.createClass({

/*  getInitialState: function() {
      return {

      }
  },

  componentDidMount: function() {
    Store.addListener("change", this._homeData);

  }, 

  componentWillUnmount: function() {
    Store.removeListener("change", this._homeData);
  },

  _homeData: function(){
      this.setState({

      });  
  },*/

	render: function() {
        return (         
          <div className='homeContainer'>
              Bernie is soo cool. 
          </div>
        )
	}
});

module.exports = BusinessListings;