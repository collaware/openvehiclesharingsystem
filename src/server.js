/* Open Vehicle Sharing System v1.0.0 Server */

// Basic Module loading

const fs = require('fs');
const https = require('https');
const http = require('http');

//var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

//var credentials = { key: privateKey, cert: certificate };

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mssql = require('mssql');
var path = require('path');

var zipFolder = require('zip-folder');

var cron = require('node-cron');

var jwt = require('jsonwebtoken');
var config = require('../src/config/config');
var Secret = config.secret;

// Service Module loading

if(config.logingEnabled) var logService = require("../src/services/logservice/log");

// Server START

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(config["http-server-port"]);
//httpsServer.listen(config["https-server-port"]);

//app.listen(config["http-server-port"]);
//https.createServer(options, app).listen(config["https-server-port"]);
console.log('Magic happens at http://localhost:' + config["http-server-port"]);
//console.log('Magic happens at https://localhost:' + config["https-server-port"]);