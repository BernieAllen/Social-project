var React = require('react');
var Actions = require('../../actions/home_actions');
var Store = require('../../stores/home_store');
var Link = require('react-router').Link;


var Home = React.createClass({

  getInitialState: function() {
      return {
        homePagePostData: [],
        viewAction: []
      }
  },

  componentDidMount: function() {
    Store.addListener("change", this._homeData);

      if(this.state.homePagePostData.length === 0) {
         Actions.Home_Page_Posts();
      }
  }, 

  componentWillUnmount: function() {
    Store.removeListener("change", this._homeData);
  },

  _homeData: function(){
      this.setState({
         homePagePostData: Store.homePagePostData(),
         viewAction: Store.userAction()
      });  
  },

	render: function() {

          var list = this.state.homePagePostData.map(function(items){
            if(items.image !== ''){
              return (
                <div key={items.post_id} className="myItems"> 
                  <div className="myItem_description"> <img src={'images/post_pics/'+items.image} width='200'/></div>
                  <div className="myItem_header">{items.text} </div>
                  <div className="post_user_data">Posted by: <Link to={'profile/'+ items.user_id }>{items.username}</Link></div>
                  <span className='favorite_button homeComp'> Fav </span>
                </div>
              );             
            }
          });

        return (
          
          <div className='homeContainer'>
              {list} <br className='clear'/>
          </div>
        )
	}
});

module.exports = Home;