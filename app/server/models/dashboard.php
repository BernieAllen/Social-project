<?php

class Dashboard_Model {
     
     public 
     function insert_post_with_an_image($userid, $category, $posttext, $fileTmp, $fileName) {
     	include_once "../connect.php";
     	$rand = rand();
		$pic = $rand."-".$fileName;
        $query = $conn->prepare("INSERT INTO `posts` (`post_image`, `post_text`, `poster_id`, `category`) VALUES ('$pic', '$posttext', '$userid','$category')");    
	    $query->execute();
	        if($query){
	        	if(move_uploaded_file($fileTmp, "../../images/post_pics/".$pic)){
	        		echo 'all_good';
	        	}
	        } else {
	        	echo 'There was a problem';
	        }
     }

     public
     function insert_post_without_an_image($userid, $category, $posttext) {
        include_once "../connect.php";

        $query = $conn->prepare("INSERT INTO `posts` (`post_text`, `poster_id`, `category`) VALUES ('$posttext', '$userid','$category')");    
	    $query->execute();
	        if($query){
	        	echo 'all_good';
	        } 
     }

     public
     function get_posts_from_people_this_user_follows($userid) {
         include_once "../connect.php";

         function time_elapsed_string($datetime) { // Format the time post date
			    $now = new DateTime;
			    $ago = new DateTime($datetime);
			    $diff = $now->diff($ago);

			    $diff->w = floor($diff->d / 7);
			    $diff->d -= $diff->w * 7;

			    $string = array(
			        'y' => 'year',
			        'm' => 'month',
			        'w' => 'week',
			        'd' => 'day',
			        'h' => 'hour',
			        'i' => 'minute',
			        's' => 'second',
			    );
			    foreach ($string as $k => &$v) {
			        if ($diff->$k) {
			            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
			        } else {
			            unset($string[$k]);
			        }
			    }

			    if ($string = array_slice($string, 1));
			    return $string ? implode(', ', $string) . ', ago' : 'just now';
		} 


        $postdata = []; // Array that gets passed to client with all relevent data

        // Query to get all the posts a user likes
        $queryLike = $conn->prepare("SELECT * FROM `user_likes` WHERE `user_id` = '". $userid ."'" );    
        $queryLike->execute();
        $resultLike = $queryLike ->fetchAll(); 
            $likedposts = [];
            if($resultLike) {
	            foreach($resultLike as $user_likes){ 
                 array_push($likedposts, $user_likes['post_id']);
	            }
            }

           
        $query = $conn->prepare("SELECT *
            FROM `posts` 
            WHERE `poster_id` IN (SELECT `followed_id` FROM `user_follows` WHERE `follower_id` = '$userid') OR `poster_id` = '$userid' ORDER BY `id` DESC"
        );    
	    $query->execute();
	    $result = $query->fetchAll();
	        if($result){	

	            foreach($result as $followed_posts) {

                    $poster_id = $followed_posts['poster_id'];
                    $query2 = $conn->prepare("SELECT `id`,`first_name`, `last_name`, `profile_pic` FROM `users` WHERE `id` = '". $poster_id ."'" );    
			        $query2->execute();
			        $result2 = $query2 ->fetchAll();

                
			        // Check shich posts in a users newsfeed have been liked
			        if(in_array($followed_posts['id'], $likedposts)) {
	            		$user_like = 'liked';
	            	} else if(!in_array($followed_posts['id'], $likedposts)) {
	            		$user_like = 'not_liked';
	            	}

			        if($result2) {
			            foreach($result2 as $user_data){

		                   $_firstname =  $user_data['first_name'];
		                   $_lastname = $user_data['last_name'];
		                   $_profilepic = $user_data['profile_pic'];
		                   $_userid = $user_data['id'];
		                   $_image = $followed_posts['post_image'];
		                   $_text = $followed_posts['post_text'];
	                       $_category = $followed_posts['category'];
	                       $_postid =  $followed_posts['id'];
	                       $_postdate = explode(',', time_elapsed_string($followed_posts['date']))[0];
	                       $_liked = $user_like;



	                       $data = array("firstname" => $_firstname, "lastname" => $_lastname, "profilepic" => $_profilepic, "user_id" => $_userid, "post_id" => $_postid, "posttext" => $_text ,"category" => $_category, "postimage" => $_image, "date" => $_postdate, 'liked' => $_liked);
	                       	array_push($postdata, $data);
			            }

			        }
	            } 	
	        }
	    echo json_encode($postdata); 
     }

     public
     function insert_the_like($userid, $postid) {
     	include_once "../connect.php";

     	$check = $conn->prepare("SELECT * FROM `user_likes` WHERE `post_id` = '".$postid."' AND `user_id`= '". $userid ."' ");
        $check->execute();
        $resultCheck = $check->fetchAll();
        
        if(count($resultCheck) === 1) {
            $query = $conn->prepare("DELETE FROM `user_likes` WHERE `post_id` = '".$postid."' AND `user_id`= '". $userid ."'");    
		    $query->execute();
		        if($query){
		        	echo 'deleted';
		        } 
        } else {
        	$query = $conn->prepare("INSERT INTO `user_likes` (`post_id`, `user_id`) VALUES ($postid, $userid)");    
		    $query->execute();
		        if($query){
		        	echo 'all_good';
		        } 
        }

     }

     public
     function check_if_a_user_likes_post($userid) {
     	include_once "../connect.php";
     	
        $likedPosts = [];
     	$query = $conn->prepare("SELECT * FROM `user_likes` WHERE `user_id` = '". $userid ."'" );    
        $query->execute();
        $result = $query ->fetchAll(); 

            if($result) {
	            foreach($result as $user_likes){
	                $data = array('post_id' => $user_likes['post_id'], 'user_id' => $userid);
	                array_push($likedPosts, $data);	
	            }
            }
        echo json_encode($likedPosts);
     }

     public
     function delete_this_user_post($userid, $postid, $image) {
     	include_once "../connect.php";
        
        //chmod("../../images/post_pics",0666);
     	//unlink(realpath("../../images/post_pics". $image));
     	$query = $conn->prepare("DELETE FROM `posts` WHERE `id` = '".$postid."' AND `poster_id`= '". $userid ."'");    
		    $query->execute();
		        if($query){
		        	echo 'deleted';
		        } 
     }

    public 
    function get_messages($userid) {
      include_once "../connect.php"; 

      $query1 = $conn->prepare ("SELECT `message` FROM `received_messages` WHERE `messaged_id` = '$userid'");
      $query1->execute();
      $result1 = $query1->fetchAll();

      echo json_encode(count($result1)); 
  }


}


