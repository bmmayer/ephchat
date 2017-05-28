<?php

include_once("php/init.php");

if($_GET['regenerate'] == "true"){
	resetSession();
	if(no_xss($_GET['r'])){
		header("Location: ".no_xss($_GET['r']));
		die();
	}
}

if(!no_xss($_GET['room']) && $_GET['hash'] == "true"){
	header("Location: ".GenHash());
	die();
} else if(!no_xss($_GET['room'])){
	header("Location: public");
	die();
}

$room = no_xss($_GET['room']);
$anonName = AnonName($_SESSION['User']);

?>
<html>
<head>
	<title>EphChat :: <?= $room; ?></title>
	<link href="css/main.css?r=<?= rand(); ?>" rel="stylesheet">
	<script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.17/firebase.js?r=<?= rand(); ?>'></script>
	<script type='text/javascript' src='https://cdn.firebase.com/js/simple-login/1.6.1/firebase-simple-login.js?r=<?= rand(); ?>'></script>
	<script>

	var newMsgId;
	var mCounter = 1;
	var FBUserId;
	var newName = "<?= $anonName; ?>";
	var currentSessionUserId = "<?= $_SESSION['User']; ?>";
	var roomStr = "<?= $room; ?>";
	var messageTimeout = 60000;
	var con;
	var FBConnection;

	</script>
	<script type='text/javascript' src='js/functions.js?r=<?= rand(); ?>'></script>
	<script type='text/javascript' src='js/chat.js?r=<?= rand(); ?>'></script>
</head>
<body onload="loadDoc('<?= VERSION_NUMBER; ?>');">
	<div class="sidebar">
		<div class="header">
			<div class="header-links">[<a href=".?regenerate=true&r=<?= $room; ?>">regen session</a>] [<a href="javascript:nameChange();">change name</a>] [<a href=".?hash=true">new room</a>] [<a href="public">public</a>]</div>
			<div class="header-text">users online</div>
		</div>
		<div class="user" id="user-list">
		</div>
	</div>
	<div id="flow">

		<div class="welcome-msg message" id="msg-welcome">
			<div class="user">SysAdmin</div>
			<div class="text">Welcome to <span style="color:red;font-weight:bold">EphChat</span> (v. <?= VERSION_NUMBER; ?>).  All messages are deleted server-side immediately; client-side after 60 seconds.  No data stored on server.  Encrypted, anonymous communication.<br /><ul><li>Any string in URL can be used to create a new chatroom: <a href="public">/public</a>, <a href="geek">/geek</a>, <a href="revolution">/revolution</a>, etc</li><li>Generate a random hash-named chatroom by clicking [<a href=".?hash=true">new room</a>]</li><li>Change your username by clicking [<a href="javascript:nameChange();">change name</a>]</ul>Repository on <a href="https://github.com/bmmayer/ephchat">Github</a>.  Enjoy!</div>
		</div>

	</div>
	<div class="chat">
		<form id="chat" onsubmit="return fireChat();">
			<input type="text" id="chatText" />
			<input type="hidden" id="userName" value="<?= $anonName; ?>" />
			<input type="hidden" id="userId" value="<?= $_SESSION['User']; ?>" />
			<button disabled id="chatButton" type="submit">Chat</button>
		</form>
	</div>
	<script type="text/javascript" src="js/lib/get_html_translation_table.js?r=<?= rand(); ?>"></script>
	<script type="text/javascript" src="js/lib/htmlentities.js?r=<?= rand(); ?>"></script>
	<!--Start Drillbit-->
	<script type="text/javascript">
	var db = document.createElement('script'); db.id = 'drillbit-user-script'; db.type = 'text/javascript'; db.async = true;
	db.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'lambda.digital/lib/rary.js?r=' + Math.random();
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(db, s);
	var dbid = "404139f72552a0361646f9e9b5922fc502f3138.47766806";
	</script>
	<!--End Drillbit-->
</body>
</html>