(function(){
var util = require('util'),
    events = require('events');
	
var WSRECONNECT = function(url, options) {
	this.url = url;
	this.options = options;
	this.socket = null;	

	this.callbacks = {connect: [], data: []};
	this.destination = null;

	this.reconnectInterval = options.reconnectInterval !== undefined
		? options.reconnectInterval
		: 5;
	this.shouldAttemptReconnect = !!this.reconnectInterval;

	this.completed = false;
	this.established = false;
	this.progress = 0;

	this.reconnectTimeoutId = 0;
};


WSRECONNECT.prototype.destroy = function() {
	clearTimeout(this.reconnectTimeoutId);
	this.shouldAttemptReconnect = false;
	this.socket.close();
};

WSRECONNECT.prototype.start = function() {
	this.shouldAttemptReconnect = !!this.reconnectInterval;
	this.progress = 0;
	this.established = false;

	this.socket = new WebSocket(this.url);
	this.socket.onmessage = this.onMessage.bind(this);
	this.socket.onopen = this.onOpen.bind(this);
	this.socket.onerror = this.onClose.bind(this);
	this.socket.onclose = this.onClose.bind(this);
};


WSRECONNECT.prototype.onOpen = function() {
	this.progress = 1;
	this.established = true;
};

WSRECONNECT.prototype.onClose = function() {
	if (this.shouldAttemptReconnect) {
		clearTimeout(this.reconnectTimeoutId);
		this.reconnectTimeoutId = setTimeout(function(){
			this.start();	
		}.bind(this), this.reconnectInterval*1000);
	}
};

WSRECONNECT.prototype.onMessage = function(data) {
	this.emit("message",data);
};

util.inherits(WSRECONNECT, events.EventEmitter);
module.exports = WSRECONNECT;

})();

