<?php
include_once "../controllers/userprofile.php";

switch ($_POST['phase']) {
    case 'get_user_data';
        $var = new Profile_Page_Controller;
        $var -> get_user_data($_POST['id']);
        break;
    case 'get_post_data';
        $var = new Profile_Page_Controller;
        $var -> get_post_data($_POST['id']);
        break;
    case 'insert_a_follow';
        $var = new Profile_Page_Controller;
        $var -> insert_user_follow($_POST['followed_id'], $_POST['follower_id']);
    break;
    case 'get_user_followers';
        $var = new Profile_Page_Controller;
        $var -> get_user_followers($_POST['id']);
    break;
    case 'get_user_following';
        $var = new Profile_Page_Controller;
        $var -> get_user_following($_POST['id']);
    break;
    case 'unfollow_this_user';
        $var = new Profile_Page_Controller;
        $var -> unfollow_the_user($_POST['followed_id'], $_POST['follower_id']);
    break;
    case 'get_user_likes';
        $var = new Profile_Page_Controller;
        $var -> get_user_likes($_POST['userid']);
    break;
    case 'check_if_user_follows';
        $var = new Profile_Page_Controller;
        $var -> check_if_user_follows($_POST['logged_in_user_id'], $_POST['visted_profile_id']);
    break;
    case 'insert_message';
        $var = new Profile_Page_Controller;
        $var -> insert_user_message($_POST['messenger_id'], $_POST['messaged_id'], $_POST['message'], $_POST['messageTitle']);
    break;
    default:
        echo "Boo!";
}