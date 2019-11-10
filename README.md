# MMM-WiFiPassword
Magic Mirror Module that displays your WiFi Network, Password, and QRCode so people who visit your house/business can connect easier. 

Note that if you have special characters in your password, the QR code will not work.  This is because I haven't done the work required to escape the special characters properly. 

## Screenshot

![MMM-WifiPassword Screenshot](https://raw.githubusercontent.com/TeraTech/MMM-WiFiPassword/master/mm.png)


## Installation
  1. In your terminal, change to your Magic Mirror module directory

    `cd ~/MagicMirror/modules`
  
  2. Clone this repository
  `git clone git@github.com:TeraTech/MMM-WiFiPassword.git`
  
  3. Make changes to your `config.js` file.  
  
## How to use this module
As with other MM modules, add this array to the `config/config.js` file

``` 
modules:[
  {
    module: 'MMM-WiFiPassword',
    position: "top_left",
      config: {
        //See 'Configuration options' for more information.
        network: "my_network", 
        password: "my_pass",
      }
  },
]
```
## Configuration Options 

| Option | Description | Default |
| ------------- | ------------- | ------------- |
| `qrSize`  | The width and height of QRCode. | 125 |
| `colorDark`  | The color of the "dark" area of the QRCode. | #fff |
| `colorLight`  | The color of the "light" area of the QRCode. | #000 |
| `authType`  | Your authentication type. Options are `WPA` `WEP` `NONE` | WPA |
| `network`  | Your Network SSID. | REQUIRED |
| `password`  | Your Network Password. | REQUIRED |
| `hiddenId`  | Whether your SSID is hidden. | false |
| `debug`  | Displays raw QR text. | false |

