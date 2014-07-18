var FBBase = 'https://ephemeralchat.firebaseio.com/';
var loginFB = new Firebase(FBBase);
var messagesObj = loginFB.child('rooms/'+roomStr+'/messages');
var messagePoll = loginFB.child('rooms/'+roomStr+'/poll');
var connections = loginFB.child('rooms/'+roomStr+'/connections');

var auth = new FirebaseSimpleLogin(loginFB,function(error,user){
	if(error){
		console.log(error);
	} else if(user){
		FBConnection = loginFB.child('rooms/'+roomStr+'/connections/'+user.uid);
		FBUserId = user.uid;
	} else {
		auth.login('anonymous');
	}

	FBConnection.set({
		userId: currentSessionUserId,
		userName: newName,
		FBUserId: FBUserId
	});

	FBConnection.onDisconnect().remove();

	messagePoll.on('child_added',function(snapshot){
		var pollMsgId = snapshot.val().messageId;
		messagesObj.child(pollMsgId).once('value',function(snapshot){
			var msg = snapshot.val();
			addMessageToFlow(msg.userName,msg.userId,msg.message,pollMsgId,function(){
				scrollToBottom();
			});
			messagesObj.child(pollMsgId).remove();
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

			if(snapshot.val().userName){
				newName = snapshot.val().userName;
			}

			document.getElementById("userName").value = newName;

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

	document.getElementById("chatButton").disabled = false;

});