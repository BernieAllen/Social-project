<?php

class Login_User {
    public 
	function check_user($email, $password) {
	   session_start();
	   include_once "../connect.php";

       $query = $conn->prepare("SELECT * FROM `users` WHERE `email` = '".$email."' AND `password`= '". $password ."' ");
       $query->execute();
       $result = $query->fetchAll();
        if(count($result) === 1) {
        	foreach($result as $results) {
	       	    $_SESSION['currentUser'] = $results['email'];				
					if(isset ($_SESSION['currentUser']) === true) {
						echo "logging_in";
					}
	       }
        }
	}
	public
	function get_login_status(){
		include_once "../connect.php";
		session_start();
    	if(isset($_SESSION['currentUser']) === true){ 
	    echo "is_logged_in";
	    }
	    else {
	    	echo "not_logged_in"; //Echoed for use with Javascript
			return "not_logged_in"; //returned for use in PHP
		}
    }
    public
    function logout_user() {
		session_start();
		session_destroy();
            echo 'session_destroyed';
    }
}






