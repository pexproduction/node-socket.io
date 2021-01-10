var express = require('express')
var app = express()

app.use(express.static('public'))

var io = require('socket.io').listen(server);
var server = http.createServer(app);

port = process.env.PORT
app.listen(port)





