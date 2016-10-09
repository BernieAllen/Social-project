<?php

include_once "../controllers/dashboard.php";

switch ($_POST['phase']) {
    case 'insert_post_with_image':
        $var = new Dashboard_Controller;
        $var -> insert_post_with_image ($_POST['userid'], $_POST['category'], $_POST['postText'], $_FILES['file']['name'], $_FILES['file']['tmp_name'], $_FILES['file']['type'], $_FILES['file']['size'], $_FILES['file']['error']);      
    break;
    case 'insert_post_without_image':
        $var = new Dashboard_Controller;
        $var -> insert_post_without_image ($_POST['userid'], $_POST['category'], $_POST['postText']);      
    break;
    case 'get_following_posts':
        $var = new Dashboard_Controller;
        $var -> get_following_posts($_POST['userid']); 
    break;
    case 'insert_user_like':
        $var = new Dashboard_Controller;
        $var -> insert_user_like($_POST['userid'], $_POST['postid']); 
    break;
    case 'get_user_likes':
        $var = new Dashboard_Controller;
        $var -> get_user_likes($_POST['userid']); 
    break;
    case 'delete_this_post':
        $var = new Dashboard_Controller;
        $var -> delete_this_post($_POST['userid'], $_POST['postid'], $_POST['image']);
    break;
    case 'get_message_notifications';
        $var = new Dashboard_Controller;
        $var -> get_messages_notifications($_POST['userid']);
    break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}





