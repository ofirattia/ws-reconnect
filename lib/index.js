(function(){
var util = require('util'),
    events = require('events'),
	WebSocket = require('ws');
var WSRECONNECT = function(url, options) {
	if(!url){
		throw new Error("Please define dest url");
	}
	this.url 					= url && url.indexOf("ws") == -1 ? "ws://"+url : url;
	this.options 				= options || {};
	this.socket 				= null;	
	this.isConnected 			= false;
	this.reconnectTimeoutId 	= 0;
	this.retryCount 			= this.options.retryCount || 2;
	this.reconnectInterval 		= this.options.reconnectInterval !== undefined ? this.options.reconnectInterval : 5;
	this.shouldAttemptReconnect = !!this.reconnectInterval;
};


WSRECONNECT.prototype.destroy = function() {
	clearTimeout(this.reconnectTimeoutId);
	this.shouldAttemptReconnect = false;
	this.socket.close();
};

WSRECONNECT.prototype.start = function() {
	this.shouldAttemptReconnect = !!this.reconnectInterval;
	this.isConnected 		 	= false;
	this.socket 			 	= new WebSocket(this.url);
	this.socket.onmessage 	 	= this.onMessage.bind(this);
	this.socket.onopen 		 	= this.onOpen.bind(this);
	this.socket.onerror		 	= this.onClose.bind(this);
	this.socket.onclose 	 	= this.onClose.bind(this);
};


WSRECONNECT.prototype.onOpen = function() {
	this.isConnected 	= true;
	this.emit("connect");
};

WSRECONNECT.prototype.onClose = function(reason) {
	if (this.shouldAttemptReconnect && this.retryCount > 0) {
		this.emit("reconnect");
		this.retryCount--;
		clearTimeout(this.reconnectTimeoutId);
		this.reconnectTimeoutId = setTimeout(function(){
			this.start();
		}.bind(this), this.reconnectInterval*1000);
	}else{
		this.emit("destroyed");
	}
};

WSRECONNECT.prototype.onMessage = function(message) {
	this.emit("message",message.data);
};

util.inherits(WSRECONNECT, events.EventEmitter);
module.exports = WSRECONNECT;

})();

