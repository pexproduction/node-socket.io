var express = require('express')
var app = express()

app.use(express.static('public'))

var io = require('socket.io').listen(server);

port = process.env.PORT
app.listen(port)

var server = http.createServer(app);
