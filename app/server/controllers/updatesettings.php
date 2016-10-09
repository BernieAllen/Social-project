<?php
   include_once '../models/updatesettings.php';

   class Update_Settings_Controller {
       
    public 
    function update_user_settings($firstname, $lastname, $email, $about, $userid) {
        
        $var = new Update_Settings_Model;
        $var -> update_user_settings($firstname, $lastname, $email, $about, $userid);
    }


   }







