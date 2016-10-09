<?php 
include_once "../models/dashboard.php";
 
 class Dashboard_Controller {  
   
   public
   function insert_post_with_image ($userid, $category, $posttext, $fileName, $fileTmp, $fileType, $fileSize, $fileErrorMsg) {
      $getExt = explode(".",$fileType);

				if($getExt[0] === "image/jpeg" || $getExt[0] === "image/png"){
					$var = new Dashboard_Model();
					$var->insert_post_with_an_image($userid, $category, $posttext, $fileTmp, $fileName);	
				} else {
				  echo "jpg/png only";
				}
   }

   public
   function insert_post_without_image($userid, $category, $posttext) {
   	   $var = new Dashboard_Model();
	      $var->insert_post_without_an_image($userid, $category, $posttext);	
   }

   public
   function get_following_posts($userid) {
        $var = new Dashboard_Model();
        $var->get_posts_from_people_this_user_follows($userid);   
   }

   public
   function insert_user_like($userid, $postid) {
        $var = new Dashboard_Model();
        $var->insert_the_like($userid, $postid); 
   }

   public
   function get_user_likes($userid) {
        $var = new Dashboard_Model();
        $var->check_if_a_user_likes_post($userid); 
   }

   public
   function delete_this_post($userid, $postid, $image) {
      $var = new Dashboard_Model();
      $var -> delete_this_user_post($userid, $postid, $image);
   }

  public
  function get_messages_notifications($userid) {
      $var = new Dashboard_Model;
      $var -> get_messages($userid);  
  }
 }




