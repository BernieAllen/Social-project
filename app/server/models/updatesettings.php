<?php
  

  class Update_Settings_Model {
     public
     function update_user_settings($firstname, $lastname, $email, $about, $userid) {
        include_once "../connect.php";

     	$sql = "
            Update 
              `users` 
            SET 
              `first_name` ='". $firstname ."',
              `last_name` = '". $lastname ."',
              `email` = '". $email ."',
              `about` = '". $about ."'
            WHERE
            `id` = '". $userid . "'
      ";

     $query = $conn->prepare($sql);
     $query->execute();

     // echo a message to say the UPDATE succeeded
    if($query->rowCount() === 1) {
        echo "Record updated successfully";
    }

     }
  }




