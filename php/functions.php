<?php

function charid(){
	return strtoupper(md5(uniqid(rand(), true)));
}

function GenHash($long=false){
	mt_srand((double)microtime()*10000);
	$hyphen = chr(45);
	$uuid = substr($charid, 0, 8).$hyphen
	.substr(charid(), 8, 4).$hyphen
	.substr(charid(),12, 4).$hyphen
	.substr(charid(),16, 4).$hyphen
	.substr(charid(),20,12);
	if($long == true){
		return str_shuffle(hash("sha512",$uuid).strtoupper(session_id()));
	} else {
		return substr(str_shuffle(hash("sha512",$uuid).strtoupper(session_id())),0,25);
	}
}

function AnonName($string){
	return "Anon".substr(preg_replace("/[^0-9]/", '', $string),0,5);
}

function resetSession(){
	session_regenerate_id(true);
	unset($_SESSION['User']);
}


function no_xss($str){ // from github/sarciszewski
    return htmlentities( preg_replace("/[^A-Za-z0-9]/", '', $str), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
}

?>