<?php
include_once "../models/register.php";
class Register {

	public 
    function register_user($firstname, $lastname, $email, $password) {
        
        if(empty($firstname) === true){
           echo "First name*";
        }else 
        if(empty($lastname) === true){
          echo "Last name*";
        } else
        if(empty($email) === true){
           echo "Email*";
        } else 
        if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
          echo "A valid email is required*";
        } else
        if(empty($password) === true){
           echo "password*";
        }
        else {
           $var = new Register_User;
           $var -> register($firstname, $lastname, $email, $password);
        }
    }
}



