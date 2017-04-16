# ws-reconnect: a Node.js WebSocket Client 

[![npm version](https://badge.fury.io/js/ws-reconnect.svg)](https://badge.fury.io/js/ws-reconnect)

## Usage

# Server Example
```
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1010 });


wss.on('connection', function connection(ws) {
  console.log("new connection");
  ws.on('message', function incoming(data) {
    console.log("incoming message: "+data);
  });
  
  setInterval(function(){
	  ws.close();
  },4000);
  setInterval(function(){
	  if(ws.readyState === 1)
		ws.send("hello");
  },1000);
});
```
# Client Example
```
var WSCLINET = require('ws-reconnect');
var wsclient = new WSCLIENT("localhost:1010",{
	retryCount:1, // default is 2
	reconnectInterval: 1 // default is 5
});
wsclient.start();
wsclient.on("message",function(data){
	console.log(data);
});

wsclient.on("reconnect",function(){
	console.log("reconnecting");
});
wsclient.on("connect",function(){
	console.log("connected");
});
wsclient.on("destroyed",function(){
	console.log("destroyed");
});
```
