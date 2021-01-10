  
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const namespaces = io.of(/^\/[a-z]{8}$/);

namespaces.on('connection', function(socket) {
  const namespace = socket.nsp;

  socket.emit('message', `Successfully connected on namespace: ${namespace.name}`);

  socket.on('message', function(data) {
    console.log('A message was received from a client: ', data);
    socket.broadcast.emit('message', data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});



