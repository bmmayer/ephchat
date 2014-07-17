var FBBase = 'https://ephemeralchat.firebaseio.com/';
var messagesObj = new Firebase(FBBase+'rooms/'+roomStr+'/messages');
var userObj = new Firebase(FBBase+'users/'+currentSessionUserId);
var connections = new Firebase(FBBase+'rooms/'+roomStr+'/connections');
var messageTimeout = 60000;

userObj.onDisconnect().remove();

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