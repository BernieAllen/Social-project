<?php
include_once "../controllers/userdata.php";

switch ($_POST['phase']) {
    case 'get_user_data':
        $var = new User_Data;
        $var -> get_user_data();
        break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}
