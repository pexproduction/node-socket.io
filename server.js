var express = require('express')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res) {
  res.sendFile('index.html');
});

app.post('/', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
})

port = process.env.PORT
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
