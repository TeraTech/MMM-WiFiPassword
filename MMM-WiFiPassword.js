Module.register("MMM-WiFiPassword", {
    defaults: {
        qrSize: 125,
        colorDark: "#000",
        colorLight: "#fff",
        authType: "WPA", // WEP, WPA, NONE
        network: "REQUIRED", // Your Network ID
        password: "REQUIRED", // Your Network Password
        header: "Local WiFi Details", // Default heading
        hiddenId: false, // Whether your Network ID is hidden
        layoutVertical: true, // Whether to display in vertical (true), or horizontal (false) mode.
        showNetwork: true, // Display network name
        showPassword: true, // Display password
        showAuthType: true, // Dispay authentication type
        debug: false
    },

    start: function () {
        this.auth = "";

        switch (this.config.authType.toUpperCase()) {
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
            "T:" + this.auth +
            ";S:" + this.config.network +
            ";P:" + this.config.password +
            (this.config.hiddenId ? ";H:" : ";") +
            ";";

        // add a hidden qr code to the document to use for modals

        // Create the qr div here to be able to use it if it is only used as a modal
        this.qrDiv = document.createElement("div");
        this.qrDiv.id = "qrdiv";
        this.qrDiv.className = "qr-image";
        this.qrDiv.style = "width:" + this.config.qrSize + "px; background-color:" + this.config.colorLight;
        if (this.config.layoutVertical) {
            this.qrDiv.className += " layout-vertical";
        } else {
            this.qrDiv.className += " layout-horizontal";
        }

        this.qrDiv.style.display = "none";
        document.body.appendChild(this.qrDiv);

        var qrOptions = {
            text: this.qrText,
            width: this.config.qrSize,
            height: this.config.qrSize,
            colorDark: this.config.colorDark,
            colorLight: this.config.colorLight,
            correctLevel: QRCode.CorrectLevel.H
        };

        var qrCode = new QRCode(this.qrDiv, qrOptions);
    },

    getDom: function () {
        var div = document.createElement("div");
        div.id = "WiFiPassword";
        div.className = "text";
        if (!this.config.layoutVertical) {
            div.style.height = this.config.qrSize + "px";
        }

        if (this.config.header) {
            var header = document.createElement('header');
            header.innerHTML = this.config.header;
            div.appendChild(header);
        }

        div.appendChild(this.qrDiv);

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

    getScripts: function () {
        return [
            'qrcode.min.js', // library that creates qrcode. Thanks to https://github.com/davidshimjs/qrcodejs
            'MMM-WiFiPassword.css',
        ];
    },

    notificationReceived: function (notification, payload, sender) {
        switch (notification) {
            case "MODULE_DOM_CREATED":
                this.qrDiv.style.display = "block";

                break;

            case "WIFIPASSWORD_MODAL":
                this.sendNotification("OPEN_MODAL", {
                    template: "WifiPasswordModal.njk",
                    data: {
                        // Send config as data input to template
                        layoutVertical: this.config.layoutVertical,
                        qrSize: this.config.qrSize,
                        header: this.config.header,
                        colorLight: this.config.colorLight,
                        network: this.config.network,
                        password: this.config.password,
                        authType: this.config.authType,
                        showNetwork: this.config.showNetwork,
                        showPassword: this.config.showPassword,
                        showAuthType: this.config.showAuthType,
                        debug: this.config.debug,
                        // Send actual content
                        content: this.qrDiv.innerHTML,
                    },
                });
                break;
        }
    },

    socketNotificationReceived: function () {

    },
})
