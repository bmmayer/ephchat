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
  <link href="main.css" rel="stylesheet">
  <script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.17/firebase.js'></script>
  <script>

  var mCounter = 1;
  var messagesObj = new Firebase('https://ephemeralchat.firebaseio.com/rooms/<?= $room; ?>/messages');
  var userObj = new Firebase('https://ephemeralchat.firebaseio.com/users/<?= $_SESSION['User']; ?>');
  var connections = new Firebase('https://ephemeralchat.firebaseio.com/rooms/<?= $room; ?>/connections');
  var newName = "<?= $anonName; ?>";
  var currentSessionUserId = "<?= $_SESSION['User']; ?>";

  userObj.onDisconnect().remove();

  </script>
  <script type='text/javascript' src='chat.js'></script>
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
      <div class="text">Welcome to <span style="color:red;font-weight:bold">EphChat</span>!  All messages vanish after 25 seconds.  No data stored on server.  Encrypted, anonymous communication.  Enjoy!</div>
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