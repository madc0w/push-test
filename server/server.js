Meteor.startup(function() {
	console.log("SERVER started");

	Push.addListener("error", function(err) {
		console.error("error on push: ", err);
	});

	Push.debug = true;
	Push.Configure({
		gcm : {
			apiKey : "AAAA7XVBzf0:APA91bEm8MNr-qK23EnblaFUGzU4ifBd-jbDbfTuZ-5A82WEC17P1UOVZ9QME4k2292R0O9YNorIZpQDOO84KXqIG4ubqbERbWSQF4oIAiHZjWJz-ozvIKUSymXd44-A85Bn-q9tFCeI",
			projectNumber : "1019874495997",
		},
//		apn : {
//			certData : Assets.getText(apsCertFilename),
//			keyData : Assets.getText(apsKeyFilename),
//			passphrase : "", // TODO
//			production : true,
//			gateway : "gateway.push.apple.com",
//		},
		sound : true,
		badge : true,
		alert : true,
		vibrate : true,
	});

	Push.allow({
		send : (userId, notification) => {
			// allow all users to send notifications
			return true;
		}
	});

	Meteor.setInterval(()=> {
		Meteor.call("send");
	}, 8000);
	
});

Meteor.methods({
	
	send : function(userId) {
		console.log("sending push notification");
		const notif = {
		//	android_channel_id : user ? user._id : null,
			from : "push",
			title : "test title",
			text : "test text",
		//	badge : badge,
			sound : "airhorn.caf",
			payload : {
				text : "payload text",
			},
			gcm : {
				style : "inbox",
				summaryText : "summary text"
			},
			query : {
				userId : userId
			}
		};
		try {
			Push.send(notif);
			console.log("sent push notification to " + (userId ? userId : "all users")); 
		} catch (err) {
			console.error("Failed push notification", notif);
			console.error(err);
		}
	}
});

