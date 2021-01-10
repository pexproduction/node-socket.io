var express = require('express')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

port = process.env.PORT
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
