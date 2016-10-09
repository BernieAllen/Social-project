<?php

class Profile_Model{
   
   public
   function user_data($userid) {
   include_once "../connect.php"; 
   
    // Get data from Users table
       $query = $conn->prepare("SELECT * FROM `users` where `id` = '$userid' ");
       $query ->execute();

       $userdata = [];
       $result = $query->fetchAll();
        foreach($result as $user_deets){

        $firstname = $user_deets['first_name'];
        $lastname = $user_deets['last_name'];
        $about = $user_deets['about'];
        $avatar = $user_deets['profile_pic'];
        $user_id = $user_deets['id'];

	        	$data = array(
                  'firstname'=> $firstname,
    		          'lastname' => $lastname,
    		          'about' => $about,
    		          'avatar' => $avatar,
                  'user_id' => $user_id
	        	);
			    array_push($userdata, $data);          
        }

   
       echo json_encode($userdata); 
        
   }

   public
   function post_data($userid) { 
    include_once "../connect.php";

      // Get data from Posts table
        $query = $conn -> prepare ("SELECT * FROM `posts` WHERE `poster_id` = '$userid' ORDER BY `id` DESC");
        $query -> execute();

        $userdata = [];
        $result = $query -> fetchAll();
        foreach($result as $post_deets) {

        $post_id = $post_deets['id'];
        $image = $post_deets['post_image'];
        $text = $post_deets['post_text'];
        $user_id = $post_deets['poster_id'];
        $category = $post_deets['category'];

        $data = array(
                'post_id' => $post_id, 
                'image' => $image,  
                'text'=> $text, 
                'user_id' => $user_id, 
                'category' => $category,
        );
        array_push($userdata, $data); 
      }

      echo json_encode($userdata); 
   }


   public
   function check_if_user_is_following($logged_in_user_id, $visted_profile_id){
      include_once "../connect.php";

         $query = $conn->prepare("SELECT * FROM `user_follows` WHERE `follower_id` = '". $logged_in_user_id."' AND `followed_id`= '". $visted_profile_id ."' ");
         $query->execute();
         $result = $query->fetchAll();
  
          if(count($result) === 1) {
             echo 'user_is_followed';
          } else 
          if (count($result) !== 1) {
             echo 'user_is_not_followed';
          }
   }

  public
  function user_follow_insert($followed_id, $follower_id) {
      include_once "../connect.php";

      $query = $conn->prepare("SELECT * FROM `user_follows` WHERE `follower_id` = '". $follower_id ."' AND `followed_id`= '". $followed_id ."' ");
      $query->execute();
      $result = $query->fetchAll();
  
          if(count($result) === 0) {
              $query = $conn -> prepare ("INSERT INTO `user_follows` (`followed_id`, `follower_id`) VALUES ('$followed_id', '$follower_id') ");
              if($query->execute()) {
                 echo 'successful_insert';
              }
          }
 
  }

  public
  function unfollow_the_dude($followed_id, $follower_id) {
      include_once "../connect.php";

      $query = $conn->prepare("DELETE FROM `user_follows` WHERE `follower_id` = '$follower_id' AND `followed_id` = '$followed_id' ");
      if($query->execute()) {
         echo 'successful_delete';
      }    
  }
  
  public
  function get_followers($userid) {
      include_once "../connect.php";

      $follower_arr = [];
      $query1 = $conn->prepare ( "SELECT `follower_id` FROM `user_follows` WHERE `followed_id` = '$userid' ORDER BY `id` DESC");
      $query1->execute();
      $result1 = $query1->fetchAll();

      foreach($result1 as $their_id) {
          $query2 = $conn->prepare ( "SELECT * FROM `users` WHERE `id` = '". $their_id['follower_id'] ."' ");
          $query2->execute();
          $result2 = $query2->fetchAll();

              foreach($result2 as $deets) {
                  $data = [
                    'follower_firstname' => $deets['first_name'],
                    'follower_lastname'  => $deets['last_name'],
                    'follower_avatar'    => $deets['profile_pic'],
                    'user_id'            => $deets['id']
                  ];

                  array_push($follower_arr, $data);
              }
      } 

      echo json_encode($follower_arr);
  }

  public
  function get_following($userid) {
      include_once "../connect.php"; 
 
      $follower_arr = [];
      $query1 = $conn->prepare ( "SELECT `followed_id` FROM `user_follows` WHERE `follower_id` = '$userid' ORDER BY `id` DESC ");
      $query1->execute();
      $result1 = $query1->fetchAll();

      foreach($result1 as $their_id) {
          $query2 = $conn->prepare ( "SELECT * FROM `users` WHERE `id` = '". $their_id['followed_id'] ."' ");
          $query2->execute();
          $result2 = $query2->fetchAll();

              foreach($result2 as $deets) {
                  $data = [
                    'follower_firstname' => $deets['first_name'],
                    'follower_lastname'  => $deets['last_name'],
                    'follower_avatar'    => $deets['profile_pic'],
                    'user_id'            => $deets['id']
                  ];

                  array_push($follower_arr, $data);
              }
      } 

      echo json_encode($follower_arr);
  }

  public
  function get_likes($userid) {
     include_once "../connect.php";
      
      $likedPosts = [];
      $query = $conn->prepare("SELECT * FROM `user_likes` WHERE `user_id` = '". $userid ."' ORDER BY `id`  DESC" );    
      $query->execute();
      $result = $query ->fetchAll(); 

            if($result) {
              foreach($result as $user_likes){
                $queryPosts = $conn->prepare("SELECT * FROM `posts` WHERE `id` = '". $user_likes['post_id'] ."' ");    
                $queryPosts->execute();
                $resultPosts = $queryPosts ->fetchAll();  

                if($resultPosts) {
                  foreach($resultPosts as $postdeets) {
                  $data = [
                    'postimage'     => $postdeets['post_image'],
                    'posttext'      => $postdeets['post_text'],
                    'postdate'      => $postdeets['date'],
                    'postcategory'  => $postdeets['category']
                  ];

                  array_push($likedPosts, $data);
              }
                }               
 

              }
            }
        echo json_encode($likedPosts);
  }

  public
  function insert_message($messenger_id, $messaged_id, $message, $messageTitle) {
       include_once "../connect.php";

       $query1 = $conn -> prepare ("INSERT INTO `sent_messages` (`messaged_id`, `messenger_id`, `message`, `message_title`) VALUES ('$messaged_id', '$messenger_id', '$message', '$messageTitle') ");
       $query1->execute();


      $query2 = $conn -> prepare ("INSERT INTO `received_messages` (`messaged_id`, `messenger_id`, `message`, `message_title`) VALUES ('$messaged_id', '$messenger_id', '$message', '$messageTitle') ");
      if($query2->execute()) {
         echo 'successful_insert';
      }
  }


}