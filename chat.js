var con = connections.push({
	userId: currentSessionUserId,
	userName: newName
});

con.onDisconnect().remove();

userObj.update({
	sessionId: currentSessionUserId
});

userObj.on('value',function(snapshot){
	if(snapshot.val() != null){
		if(snapshot.val().name){
			newName = snapshot.val().name;
		}

		document.getElementById("userName").value = newName;

		userObj.update({
			name: newName
		});

		con.update({
			userId: currentSessionUserId,
			userName: newName
		});

	}
});

function loadDoc(version){
	document.getElementById("chatText").focus();
	console.log("Welcome to EphChat! Version "+version+".");
	setTimeout(function(){removeMsg("welcome")},60000);
}

function fireChat(){
	var msg = document.getElementById("chatText").value;
	var userName = document.getElementById("userName").value;
	var userId = document.getElementById("userId").value;
	messagesObj.push({
		message: msg,
		userName: userName,
		userId: userId
	});
	document.getElementById("chatText").value = "";
	document.getElementById("chatText").focus();
	return false;
}

function addMessageToFlow(user,userId,message,msgId,callback){
	var flow = document.getElementById("flow");
	var newContent = document.createElement("div");
	newContent.innerHTML = "<div class='message' id='msg-"+msgId+"'><div class='user user-name-"+userId+"'>"+user+"</div><div class='text'>"+message+"</div></div>";
	while (newContent.firstChild){
		flow.appendChild(newContent.firstChild);
		setTimeout(function(){removeMsg(msgId)},60000);
	}
	callback();
}

function removeMsg(msgId){
	var div = document.getElementById("msg-"+msgId);
	div.className += " fade-out";
	setTimeout(function(){
		div.parentNode.removeChild(div);
		scrollToBottom();
	},5000);
}

function nameChange(){
	newName = prompt("New Name","Bob");
	if(newName != null){
		userObj.update({
			name: newName
		});
	}
	document.getElementById("chatText").focus();
}

function scrollToBottom(){
	var objDiv = document.getElementById("flow");
	objDiv.scrollTop = objDiv.scrollHeight;
}

messagesObj.on('child_added',function(snapshot){
	var msg = snapshot.val();
	var msgId = mCounter;
	mCounter++;
	addMessageToFlow(msg.userName,msg.userId,msg.message,msgId,function(){
		scrollToBottom();
	});
	snapshot.ref().remove();
});

connections.on('child_added',function(snapshot){

	var userId = snapshot.val().userId;
	var userName = snapshot.val().userName;

	var userlist = document.getElementById("user-list");
	var newContent = document.createElement("div");
	var toWrite = "<div class='user-in-list' id='user-in-list-"+userId+"'><div class='online-indicator'></div> <span class='user-name-"+userId+"'>"+userName+"</span>";
	if(userId == currentSessionUserId){
		toWrite += " (You)";
	}
	toWrite += "</div>";
	newContent.innerHTML = toWrite;
	while(newContent.firstChild){
		userlist.appendChild(newContent.firstChild);
	}

});

connections.on('child_removed',function(snapshot){

	var userId = snapshot.val().userId;
	removeDiv = document.getElementById("user-in-list-"+userId);
	removeDiv.parentNode.removeChild(removeDiv);

});

connections.on('value',function(snapshot){

	if(snapshot.val() != null){

		var obj = snapshot.val();

		for(var i in obj){
			var userId = obj[i].userId;
			var userName = obj[i].userName;

			var elems = document.getElementsByTagName("*"), j;
			for(j in elems){
				if((' ' + elems[j].className + ' ').indexOf(' user-name-'+userId+' ') > -1){
					elems[j].innerHTML = userName;
				}
			}

		}

	}

});


