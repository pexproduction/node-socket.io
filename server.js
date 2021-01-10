var express = require('express')
var app = express()

app.use(express.static('public'))

var io = require('socket.io').listen(server);

port = process.env.PORT


var server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is on port ${PORT}`))
