<?php
include_once "../controllers/homepage.php";

switch ($_POST['phase']) {
    case 'user_posts':
        $var = new Homepage_Controller;
        $var -> homepage_posts();
        break;
   /* case 'login_status':
        $var = new Login;
        $var -> login_status();
        break;
    case 'logout_user':
        $var = new Login;
        $var -> handle_logout();
        break;*/
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}





