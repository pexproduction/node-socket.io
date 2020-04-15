'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var players = {};

function Player (id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.entity = null;
}

io.sockets.on('connection', function(socket) {

  socket.on ('initialize', function () {
            var id = socket.id;
            var newPlayer = new Player (id);
            players[id] = newPlayer;

            socket.emit ('playerData', {id: id, players: players});
            socket.broadcast.emit ('playerJoined', newPlayer);
    });

    socket.on ('positionUpdate', function (data) {
            if(!players[data.id]) return;
            players[data.id].x = data.x;
            players[data.id].y = data.y;
            players[data.id].z = data.z;

        socket.broadcast.emit ('playerMoved', data);
    });
  
      socket.on ('streamCommand', function (data) {

        socket.broadcast.emit ('commandSent', data);
    });
  
    socket.on('disconnect',function(){
        if(!players[socket.id]) return;
        delete players[socket.id];
        // Update clients with the new player killed 
        socket.broadcast.emit('killPlayer',socket.id);
      })
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
