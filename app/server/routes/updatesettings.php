<?php

include_once "../controllers/updatesettings.php";

switch ($_POST['phase']) {
    case 'update_settings':
        $var = new Update_Settings_Controller;
        $var -> update_user_settings($_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['about'], $_POST['userid']);
        break;
    default:
        echo "Your favorite color is neither red, blue, nor green!";
}




