<?php

include_once("init.php");

if($_GET['regenerate'] == "true"){
	resetSession();
	if($_GET['r']){
		header("Location: ".$_GET['r']);
		die();
	}
}

if(!$_GET['room']){
	header("Location: ".GenHash());
	die();
}

$room = $_GET['room'];
$anonName = AnonName($_SESSION['User']);

?>
<html>
<head>
	<title>EphChat :: <?= $room; ?></title>
	<link href="main.css?r=<?= rand(); ?>" rel="stylesheet">
	<script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.17/firebase.js?r=<?= rand(); ?>'></script>
	<script>

	var mCounter = 1;
	var newName = "<?= $anonName; ?>";
	var currentSessionUserId = "<?= $_SESSION['User']; ?>";
	var roomStr = "<?= $room; ?>";

	</script>
	<script type='text/javascript' src='js/functions.js?r=<?= rand(); ?>'></script>
	<script type='text/javascript' src='js/chat.js?r=<?= rand(); ?>'></script>
</head>
<body onload="loadDoc('<?= VERSION_NUMBER; ?>');">
	<div class="sidebar">
		<div class="header">
			<div class="header-links">[<a href=".?regenerate=true&r=<?= $room; ?>">regen session</a>] [<a href="javascript:nameChange();">change name</a>] [<a href=".">new room</a>]</div>
			<div class="header-text">users online</div>
		</div>
		<div class="user" id="user-list">
		</div>
	</div>
	<div id="flow">

		<div class="welcome-msg message" id="msg-welcome">
			<div class="user">SysAdmin</div>
			<div class="text">Welcome to <span style="color:red;font-weight:bold">EphChat</span> (v. <?= VERSION_NUMBER; ?>).  All messages are deleted server-side immediately; client-side after 60 seconds.  No data stored on server.  Encrypted, anonymous communication.  Code on <a href="https://github.com/bmmayer/ephchat">Github</a>.  Enjoy!</div>
		</div>

	</div>
	<div class="chat">
		<form id="chat" onsubmit="return fireChat();">
			<input type="text" id="chatText" />
			<input type="hidden" id="userName" value="<?= $anonName; ?>" />
			<input type="hidden" id="userId" value="<?= $_SESSION['User']; ?>" />
			<button type="submit">Chat</button>
		</form>
	</div>
</body>
</html>