var WSCLIENT = require("../lib");

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
