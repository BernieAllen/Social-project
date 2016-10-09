<?php
include_once "../controllers/register.php";

switch ($_POST['phase']) {
    case 'register_user':
        $var = new Register;
        $var -> register_user($_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['password']);
        break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}


?>