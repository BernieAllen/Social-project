<?php 

class Home_Page_Model {

    public
    function home_page_posts() {
     session_start();
	   include_once "../connect.php";
 
       $query = $conn->prepare("SELECT * FROM `posts` ORDER BY  `id` DESC");
       $query ->execute();

       $userdata = [];
       $result = $query->fetchAll();
        foreach($result as $post_deets){

      // Data from Posts table
        $post_id = $post_deets['id'];
        $image = $post_deets['post_image'];
        $text = $post_deets['post_text'];
        $user_id = $post_deets['poster_id'];
        $category = $post_deets['category'];

        $query2 = $conn -> prepare("SELECT `first_name`, `last_name`, `profile_pic` FROM `users` WHERE `id` = '$user_id'");
        $query2 -> execute();
        $result2 = $query2 -> fetchAll();
        foreach($result2 as $user_deets){

        //Data from Users table
        	$username = $user_deets['first_name'] ." ". $user_deets['last_name'];
        	$avatar = $user_deets['profile_pic'];

	        	$data = array('post_id' => $post_id, 
	        		          'image' => $image,  
	        		          'text'=> $text, 
	        		          'user_id' => $user_id, 
	        		          'category' => $category,
	        		          'username'=> $username,
	        		          'avatar' => $avatar
	        	        );
			    array_push($userdata, $data);          
        }

       }
   
       echo json_encode($userdata);      
    }

}



