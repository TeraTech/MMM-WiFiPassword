Module.register("MMM-WiFiPassword", {  
  defaults: {
	  qrSize: 125,
	  colorDark: "#fff",
	  colorLight: "#000",
	  authType: "WPA", // WEP, WPA, NONE
	  network: "REQUIRED", // Your Network ID
	  password: "REQUIRED", // Your Network Password
	  hiddenId: false, // Whether your Network ID is hidden
	  layoutVertical: true, // Whether to display in vertical (true), or horizontal (false) mode. 
	  showNetwork: true, // Display network name
	  showPassword: true, // Display password
	  showAuthType: true, // Dispay authentication type
	  debug: false
  },
  
  start: function () {
	  this.auth = "";
	  
	  switch(this.config.authType.toUpperCase()) {
		case "WPA":
		//case "WPA2":
		case "WEP":
			this.auth = this.config.authType.toUpperCase();
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
	  if (!this.config.layoutVertical) {
		  div.style.height = this.config.qrSize + "px";
	  }
	  
	  var header = document.createElement('header');
	  header.innerHTML = "Local WiFi Details";
	  div.appendChild(header);
	  
	  var qrDiv = document.createElement("div");
	  qrDiv.id = "qrdiv";
	  qrDiv.className = "qr-image";
	  qrDiv.style = "width=" + this.config.qrSize + "px";
	  if (this.config.layoutVertical) {
		qrDiv.className += " layout-vertical";
	  } else {
		qrDiv.className += " layout-horizontal";
	  }  
	  div.appendChild(qrDiv);

	  var textDiv = document.createElement("div");
	  textDiv.id = "textDiv";
	  div.appendChild(textDiv);
	

	  if (this.config.showNetwork) {
		var networkNameDiv = document.createElement("p");
		networkNameDiv.className = "text network";
		networkNameDiv.innerHTML = "<b>Network:</b> " + this.config.network;
		textDiv.appendChild(networkNameDiv);
	  }
	  
	  if (this.config.showPassword) {
		var networkPassDiv = document.createElement("p");
	  	networkPassDiv.className = "text password";
	  	networkPassDiv.innerHTML = "<b>Password:</b> " + this.config.password;
	  	textDiv.appendChild(networkPassDiv);
	  }
	 
	  if (this.config.showAuthType) {
		var networkTypeDiv = document.createElement("p");
	  	networkTypeDiv.className = "text network-type";
	  	networkTypeDiv.innerHTML = "<b>Authentication Type:</b> " + this.config.authType.toUpperCase();
	  	textDiv.appendChild(networkTypeDiv);
	  }
	  
	  if (this.config.debug) {
		var debugDiv = document.createElement("p");
		debugDiv.className = "text debug";
		debugDiv.innerHTML = "<b>QR String:</b> " + this.qrText;
		textDiv.appendChild(debugDiv);
	  }
	  	  
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
