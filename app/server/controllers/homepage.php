<?php
include_once "../models/homepage.php";
class Homepage_Controller {

	public 
    function homepage_posts() {
        $var = new Home_Page_Model;
        $var -> home_page_posts();
        
    }
}





