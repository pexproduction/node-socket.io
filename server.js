var express = require('express')
var app = express()

app.use(express.static('public'))

var io = require('socket.io').listen(server);

port = process.env.PORT


var server = http.createServer(app);
server.listen(port, () => console.log(`Server is on port ${port}`))
