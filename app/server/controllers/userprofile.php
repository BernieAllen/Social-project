<?php
include_once "../models/userprofile.php";

class Profile_Page_Controller {
     
    public
	function get_user_data($userid) {
        $var = new Profile_Model;
        $var -> user_data($userid);
	}

	public
	function get_post_data($userid) {
        $var = new Profile_Model;
        $var -> post_data($userid);
	}

	public
	function insert_user_follow ($followed_id, $follower_id) {
        $var = new Profile_Model;
        $var -> user_follow_insert($followed_id, $follower_id);
	}

	public
	function check_if_user_follows($logged_in_user_id, $visted_profile_id) {
       $var = new Profile_Model;
       $var -> check_if_user_is_following($logged_in_user_id, $visted_profile_id);
	}

	public
	function unfollow_the_user($followed_id, $follower_id) {
		$var = new Profile_Model;
        $var -> unfollow_the_dude($followed_id, $follower_id);
	}

    public
    function get_user_followers($userid) {
        $var = new Profile_Model;
        $var -> get_followers($userid);
	}

	public
    function get_user_following($userid) {
        $var = new Profile_Model;
        $var -> get_following($userid);
	}

	public
	function get_user_likes($userid) {
		$var = new Profile_Model;
        $var -> get_likes($userid);
	}

	public
	function insert_user_message($messenger_id, $messaged_id, $message, $messageTitle) {
	    $var = new Profile_Model;
        $var -> insert_message($messenger_id, $messaged_id, $message, $messageTitle);	
	}
}





