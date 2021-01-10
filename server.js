  
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



io.on('connection', function(socket){

  var room = socket.handshake['query']['r_var'];

  socket.join(room);
  console.log('user joined room #'+room);

  socket.on('disconnect', function() {
    socket.leave(room)
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.to(room).emit('chat message', msg);
  });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});



