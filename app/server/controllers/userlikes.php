<?php 
include_once "../models/userlikes.php";
 
 class Dashboard_Controller {  
   
   public
   function get_user_likes($userid) {
        $var = new Dashboard_Model();
        $var->check_if_a_user_likes_post($userid); 
   }
 }