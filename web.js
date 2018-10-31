
var httpServer = require('http').Server();
var express = require('express');
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname,'/page')));
app.use(express.static(path.join(__dirname,'/js')));
app.get('/', function (req, res) {
    res.redirect('./web.html');
})
app.get('/joinRoom', function (req, res) {
  res.redirect('./joinRoom.html');
})
var count = 0;
var server = app.listen(8889)
var io = require('socket.io')();
io.listen(server);

io.on('connection', function (socket) {
  var roomNum = 'user' + (++count);
  socket.on('my other event', function (data) {
    var room = Object.keys(socket.rooms)[1];
    socket.broadcast.emit('news', data);
  });
});

console.log('Server running at http://localhost:8889/');