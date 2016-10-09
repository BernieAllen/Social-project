<?php

class Inbox_Model {
	
  public 
	function getMessages($userid) {
	   include_once "../connect.php";

	    $messages_arr = [];
      $query1 = $conn->prepare ("SELECT * FROM `received_messages` WHERE `messaged_id` = '$userid' ORDER BY `id` DESC ");
      $query1->execute();
      $result1 = $query1->fetchAll();

      foreach($result1 as $messages) {
          $query2 = $conn->prepare ("SELECT * FROM `users` WHERE `id` = '". $messages['messenger_id']. "'");
          $query2->execute();
          $result2 = $query2->fetchAll();

              foreach($result2 as $deets) {
                  $data = [
                    'messenger_firstname' => $deets['first_name'],
                    'messenger_lastname'  => $deets['last_name'],
                    'messenger_avatar'    => $deets['profile_pic'],
                    'user_id'             => $deets['id'],
                    'message_id'          => $messages['id'],
                    'message'             => $messages['message'],
                    'message_title'       => $messages['message_title']
                  ];

                  array_push($messages_arr, $data);
              }
      } 

      echo json_encode($messages_arr);     
	}

  public
  function getSentMessages($userid) {
      include_once "../connect.php";

      $messages_arr = [];
      $query1 = $conn->prepare ("SELECT * FROM `sent_messages` WHERE `messenger_id` = '$userid' ORDER BY `id` DESC ");
      $query1->execute();
      $result1 = $query1->fetchAll();

      foreach($result1 as $messages) {
          $query2 = $conn->prepare ("SELECT * FROM `users` WHERE `id` = '". $messages['messenger_id']. "'");
          $query2->execute();
          $result2 = $query2->fetchAll();

              foreach($result2 as $deets) {
                  $data = [
                    'messenger_firstname' => $deets['first_name'],
                    'messenger_lastname'  => $deets['last_name'],
                    'messenger_avatar'    => $deets['profile_pic'],
                    'user_id'             => $deets['id'],
                    'message_id'          => $messages['id'],
                    'message'             => $messages['message'],
                    'message_title'       => $messages['message_title']
                  ];

                  array_push($messages_arr, $data);
              }
      } 

      echo json_encode($messages_arr);  
  }

  public
  function handleInboxTrash($postid, $userid) {
      include_once "../connect.php";

      $deleted = '';

      $query = $conn->prepare ("DELETE FROM `received_messages` WHERE `messaged_id` = '$userid' AND `id` = '$postid'");
      if($query->execute()) {
         $deleted = 'deleted';
      }

      echo $deleted;
  }

}