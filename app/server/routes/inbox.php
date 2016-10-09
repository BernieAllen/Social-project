<?php
include_once "../controllers/inbox.php";

switch ($_POST['phase']) {
    case 'get_messages':
        $var = new Inbox_Controller();
        $var -> get_messages($_POST['userid']);
    break;
    case 'get_sent_messages':
        $var = new Inbox_Controller();
        $var -> get_sent_messages($_POST['userid']);
    break;
    case 'handle_trash':
        $var = new Inbox_Controller();
        $var -> handle_trash($_POST['postid'], $_POST['userid']);
    break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}