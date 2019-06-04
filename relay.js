var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;
var five = require("johnny-five");
app.get('/', function(req, res) {
res.sendFile(__dirname + '/relay_control.html');
 
});
var relay;
var board = new five.Board();
board.on("ready", function() {
 relay = new five.Relay({
     pin:10,
     type: "NC"
 });
});
 
io.on('connection', function(socket) {
//this.pinMode(13, five.Pin.OUTPUT);
 socket.on('turn_on', function(msj) {
//this.digitalWrite(13, 1);
 relay.on();
 socket.emit('status', 'on');
 //console.log('on');
});
 socket.on('turn_off', function(msj) {
//this.digitalWrite(13, 0);
 relay.off();
 socket.emit('status', 'off');
 //console.log('off');
});
});
http.listen(PORT, function() {
 console.log('el servidor esta escuchando el puerto %s', PORT);
});