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