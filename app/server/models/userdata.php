<?php

class Get_User_Data{
   
   public
   function get_the_data() {
   include_once "../connect.php"; 
   session_start();
 
        $query = $conn->prepare("SELECT * FROM `users` WHERE `email` = '". $_SESSION['currentUser'] ."'  ");
        $query->execute();
        
        $userdata = [];
	       $result = $query->fetchAll();
	       foreach($result as $results){
	         $id = $results['id'];
	         $firstname = $results['first_name'];
	         $lastname = $results['last_name'];
	         $avatar = $results['profile_pic'];
	         $about = $results['about'];
	         $email = $results['email'];

	         
	         $data = array('user_id' => $id, 'firstname' => $firstname,  'lastname'=> $lastname, 'avatar' => $avatar, 'about' => $about, 'email' => $email);
			 array_push($userdata, $data);
	       }
   
       echo json_encode($userdata);
   }

}