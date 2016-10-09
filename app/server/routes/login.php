<?php
include_once "../controllers/login.php";

switch ($_POST['phase']) {
    case 'login_user':
        $var = new Login;
        $var -> handle_login($_POST['email'], $_POST['password']);
        break;
    case 'login_status':
        $var = new Login;
        $var -> login_status();
        break;
    case 'logout_user':
        $var = new Login;
        $var -> handle_logout();
        break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}



