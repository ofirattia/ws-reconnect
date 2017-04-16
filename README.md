# ws-reconnect: a Node.js WebSocket Client 

[![Version npm](https://img.shields.io/npm/v/ws.svg)](https://www.npmjs.com/package/ws-reconnect)

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
ws = new WSCLIENT("localhost:1010",{
	retryCount:1, // default is 2
	reconnectInterval: 1 // default is 5
});
ws.start();
ws.on("message",function(data){
	console.log(data);
});

ws.on("reconnect",function(){
	console.log("reconnecting");
});
ws.on("connect",function(){
	console.log("connected");
});
ws.on("destroyed",function(){
	console.log("destroyed");
});
```
