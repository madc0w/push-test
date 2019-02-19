console.log("client");

RaixPushAppTokens = new Mongo.Collection("_raix_push_app_tokens");

Meteor.startup(function() {

	console.log("startup");
	Push.Configure({
		android : {
			senderID : "1019874495997",
			alert : true,
			badge : true,
			sound : true,
			icon : "ic_stat_icon_005_alpha_only",
			iconColor : "#00b3ff"
		// vibrate : true,
		// clearNotifications : true
		// icon: "ic_stat_icon_005_alpha_only",
		// 			iconColor: "#00b3ff"
		},
		ios : {
			alert : true,
			badge : true,
			sound : true
		}
	});
	Push.enabled(true);
	Push.on("registration", function(data) {
		console.log("push registration.  data", data);
	});

	Push.addListener("startup", function(notification) {
		console.log("push startup.  notification", notification);
	});

	Push.addListener("token", function(token) {
		console.log("push token", token);
	});
	
	const options = {
		username : "random user " + +new Date(),
		password : "somepassword",
		profile : {
		}
	};
	Accounts.createUser(options, function(err) {
		if (err) {
			console.error("failed to create user: ", err);
		} else {
			console.log("user created", options.username);
		}
	});

});
