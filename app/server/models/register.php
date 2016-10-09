<?php

class Register_User {

    public
    function register($firstname, $lastname, $email, $password) {
    	include_once "../connect.php";
        
		$nRows = $conn->query("SELECT COUNT(*) FROM `users` WHERE `email` = '". $email ."'")->fetchColumn(); // Check if email already in use		
        if($nRows > 0) {
           echo "That Email is in use";
        } else
		if($nRows == 0) {
            $query = $conn->prepare("INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`) VALUES ('$firstname', '$lastname', '$email', '$password')");
	        $query->execute();

	        if($query){
	        	echo "success";
	        }
		}

    }

}



