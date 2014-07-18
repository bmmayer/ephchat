function loadDoc(version){
	focusChat();
	console.log("Welcome to EphChat! Version "+version+".");
	setTimeout(function(){removeMsg("welcome")},messageTimeout);
}

function fireChat(){
	var msg = document.getElementById("chatText").value;
	var userName = document.getElementById("userName").value;
	var userId = document.getElementById("userId").value;

	var newMsgId = mCounter + "_" + currentSessionUserId;
	mCounter++;

	messagesObj.child(newMsgId).set({
		message: msg,
		userName: userName,
		userId: userId,
		FBUserId: FBUserId,
		RoomId: roomStr,
		timestamp: Firebase.ServerValue.TIMESTAMP
	});

	messagePoll.push({
		messageId: newMsgId,
		FBUserId: FBUserId
	});

	document.getElementById("chatText").value = "";
	focusChat();
	return false;
}

function addMessageToFlow(user,userId,message,msgId,callback){
	var flow = document.getElementById("flow");
	var newContent = document.createElement("div");
	newContent.innerHTML = "<div class='message' id='msg-"+msgId+"'><div class='user user-name-"+userId+"'>"+user+"</div><div class='text'>"+message+"</div></div>";
	while (newContent.firstChild){
		flow.appendChild(newContent.firstChild);
		setTimeout(function(){removeMsg(msgId)},messageTimeout);
	}
	callback();
}

function updateConnectionTimestamp(){
	FBConnection.update({
		timestamp: Firebase.ServerValue.TIMESTAMP
	});
}

function removeMsg(msgId){
	var div = document.getElementById("msg-"+msgId);
	div.className += " fade-out";
	setTimeout(function(){
		div.parentNode.removeChild(div);
		scrollToBottom();
	},5000); // fade time is 5s in the CSS; needs to match
}

function nameChange(){
	newName = prompt("New Name","Bob");
	if(newName != null){
		FBConnection.update({
			userName: newName
		});
	}
	focusChat();
}

function focusChat(){
	document.getElementById("chatText").focus();
}

function scrollToBottom(){
	var objDiv = document.getElementById("flow");
	objDiv.scrollTop = objDiv.scrollHeight;
}