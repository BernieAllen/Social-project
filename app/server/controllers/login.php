<?php


class Login {

	function handle_login($email, $password){
        if(empty($email)===true){
				echo "*Email";
		} 
		else if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			echo "*Email";
		} 
		else if(empty($password)===true) {
			echo "*Password";
		} else {
			include_once "../models/login.php";
			$login_user = new Login_User;
			$login_user->check_user(strip_tags($email), strip_tags($password));
		}
	}

	function login_status() {
		include_once "../models/login.php";
		 $get_status = new Login_User;
		 $get_status -> get_login_status();
	}

	function handle_logout() {
		include_once "../models/login.php";
		$get_status = new Login_User;
		$get_status -> logout_user();
	}
}




