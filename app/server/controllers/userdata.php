<?php
include_once "../models/userdata.php";

class User_Data {

	function get_user_data(){
       
       $var = new Get_User_Data;
       $var -> get_the_data();
	}

	
}