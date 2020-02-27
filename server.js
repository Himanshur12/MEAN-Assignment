//Import Modules

var express = require('express');
var http = require('http');
var app = express();

//Import App Route

require('./app.js')(app);

//Connection to server
http.createServer(app).listen(3000);