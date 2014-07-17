<?php

//Version Number//

define("VERSION_NUMBER","0.0.1");

//Start Session//

session_start();

//Kill Stupid Error Messages//

libxml_use_internal_errors(true);
error_reporting(E_ERROR);

//Include Functions File//

include_once("functions.php");

//Generate Session Username//


if(!$_SESSION['User']){
    $_SESSION['User'] = session_id()."_".GenHash();
}

?>