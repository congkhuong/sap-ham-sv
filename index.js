var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9000;

var sapHam = require('./sapHam');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  sapHam.initGame(io, socket);
  /*socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('subscribeToTimer', (interval) => {
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on('startGame', () => {
    socket.emit('timer', new Date());
  });*/
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
