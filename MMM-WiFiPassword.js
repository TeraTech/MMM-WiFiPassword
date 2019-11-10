Module.register("MMM-WiFiPassword", {  
  defaults: {
	  qrSize: 125,
	  colorDark: "#fff",
	  colorLight: "#000",
	  authType: "WPA", // WEP, WPA, NONE
	  network: "REQUIRED", // Your Network ID
	  password: "REQUIRED", // Your Network Password
	  hiddenId: false, // Whether your Network ID is hidden
  },
  
  start: function () {
	  this.auth = "";
	  
	  switch(this.config.authType.toLowerCase()) {
		case "wpa":
		case "wep":
			this.auth = this.config.authType;
			break;
		case "none":
			this.auth = "nopass";
			break;
		default:
			this.auth = "nopass";
			break;
	  }
	  
	  //TODO: Allow for special characters
	  this.qrText = "WIFI:" +
	  "T:"  + this.auth +
	  ";S:" + this.config.network +
	  ";P:" + this.config.password +
	  ";H:" + this.config.hiddenId +
	  ";";
	  
  },
  
  getDom: function() {
	  var div = document.createElement("div");
	  div.id = "WiFiPassword";
	  div.className = "text";
	  div.innerHTML = "Local WiFi Details";
	  
	  var qrDiv = document.createElement("div");
	  qrDiv.id = "qrdiv";
	  qrDiv.className = "qr-image";
	  div.appendChild(qrDiv);
	  
	  var networkNameDiv = document.createElement("p");
	  networkNameDiv.className = "text network";
	  networkNameDiv.innerHTML = "<b>Network:</b> " + this.config.network;
	  div.appendChild(networkNameDiv);
	  
	  var networkPassDiv = document.createElement("p");
	  networkPassDiv.className = "text password";
	  networkPassDiv.innerHTML = "<b>Password:</b> " + this.config.password;
	  div.appendChild(networkPassDiv);
	  
	  var networkTypeDiv = document.createElement("p");
	  networkTypeDiv.className = "text network-type";
	  networkTypeDiv.innerHTML = "<b>Authentication Type:</b> " + this.config.authType.toUpperCase();
	  div.appendChild(networkTypeDiv);
	  	  
	  return div;
  },
  
  getScripts: function() {
	  return [
		'qrcode.min.js', // library that creates qrcode. Thanks to https://github.com/davidshimjs/qrcodejs
		'MMM-WiFiPassword.css',
	  ];
  },
  
  notificationReceived: function(notification, payload, sender) {
	  switch(notification) {
		case "DOM_OBJECTS_CREATED":
		  var qrDiv = document.getElementById("qrdiv");
		  var qrOptions = {
			  text: this.qrText,
			  width: this.config.qrSize,
			  height: this.config.qrSize,
			  colorDark: this.config.colorDark,
			  colorLight: this.config.colorLight,
			  correctLevel: QRCode.CorrectLevel.H
		  };
		  
		  var qrCode = new QRCode(qrDiv, qrOptions);
		  
		  break;
	  }
  },
  
  socketNotificationReceived: function() {
	  
  },
})
