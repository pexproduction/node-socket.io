var express = require('express')
var app = express()

app.use(express.static('public'))

port = process.env.PORT
app.listen(port)
