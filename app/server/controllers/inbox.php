<?php 
include_once "../models/inbox.php";

class Inbox_Controller {

	function get_messages($userid){
        $var = new Inbox_Model;
        $var -> getMessages($userid);   
	}

	function get_sent_messages($userid){
        $var = new Inbox_Model;
        $var -> getSentMessages($userid);   
	}

	function handle_trash($postid, $userid){
        $var = new Inbox_Model;
        $var -> handleInboxTrash($postid, $userid);   
	}


}