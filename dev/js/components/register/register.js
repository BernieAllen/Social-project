'use strict';

var React = require('react');
var Actions = require('../../actions/register_actions');
//var Change_headerBar_status = require('../../actions/headerBar_actions');
var Store = require('../../stores/register_store');
var Routes = require('../../routes');
var History = require('react-router/lib/hashHistory');

 function myClass(el) { //Get class
     return document.getElementsByClassName(el)[0];
    };

var Register = React.createClass({
     getInitialState: function(){
       return {
        session: ""
      }
    },

  register_val: function() {

    var firstname = myClass("register_firstname");
    var lastname = myClass("register_lastname");
    var email = myClass("register_email");
    var password = myClass("register_password");
    var re_password = myClass("register_re_password");
    var status = myClass("myStatus");

    if(firstname.value === "" ){      
        status.innerHTML = "First name";
    } 
    else
    if(lastname.value === "") {
        status.innerHTML = "Last name";
    } 
    else
    if(email.value === "" ){      
        status.innerHTML = "Email";
    } 
    else
    if(password.value === "") {
        status.innerHTML = "Password";
    }
    else
    if(re_password.value === ""){
        status.innerHTML = "re_password";
    }
    else 
    if (re_password.value !== password.value){
      status.innerHTML = "Passwords must match";
    }
    else { 
       Actions.register_user(firstname.value, lastname.value, email.value, password.value); 

    }

  },

    componentDidMount: function() { 
       Store.addChangeListener(this._registerData);
    },

    componentWillUnmount: function() {
       Store.removeChangeListener(this._registerData);
    },

   _registerData: function() {
       var status = myClass("myStatus");

        status.innerHTML = Store.serverAction();

        if(Store.serverAction() === "success"){
              myClass("register_firstname").value = "";
              myClass("register_lastname").value = "";
              myClass("register_email").value = ""; 
              myClass("register_password").value = "";
              myClass("register_re_password").value = "";
              myClass("myStatus").value = "";

              status.innerHTML = "Thanks for registering!";

              setTimeout(function(){
                History.push('/login');
                    location.reload();
              }, 1000);
          }
  },

  render: function() {
    return (
           <div key={Math.random()} id={Math.random()} className='loginRegister_wrap'>
              <input type="text" className="register_firstname form-control"  placeholder=" First name"/>
              <input type="text" className="register_lastname form-control"  placeholder=" Last name" />
              <input type="text" className="register_email form-control"  placeholder=" Email" />
              <input type="password" className="register_password form-control"  placeholder=" Password" />
              <input type="password" className="register_re_password form-control"  placeholder=" Retype password" />
              <button onClick={this.register_val}> Register </button><br/>
              <span className="myStatus"></span>
           </div>
    );
  }

});


module.exports = Register;



 



 

