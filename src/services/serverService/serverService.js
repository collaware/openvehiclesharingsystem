var express = require('express');
const https = require('https');
const http = require('http');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../../config/config');

if(config.logingEnabled) var logService = require('../logService/logService');

function startHTTPServer(app,port){
    var httpServer = http.createServer(app);
    httpServer.listen(port);
    console.log('Magic happens at http://localhost:' + port);
}

function startHTTPSServer(app,port){
    var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
    var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

    var credentials = { key: privateKey, cert: certificate };

    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port);
    console.log('Magic happens at https://localhost:' + port);
}

function startHTTPDefaultServer(app){
    var killable = require('killable');
    var httpServer = http.createServer(app);
    httpServer.listen('8080');
    console.log("Error! HTTP or HTTPS must be enabled in order to run!");
    if(config.logingEnabled) logService.addErrorLogErrorEntry("Error! HTTP or HTTPS must be enabled in order to run!");
    if(config.logingEnabled) logService.addInfoLogBasicInfoEntry("System Terminated from an Error, for further info check error log!");
    setTimeout(shutDown, 3000);

}

function shutDown(){
    process.exit();
}

module.exports.startHTTPDefaultServer = startHTTPDefaultServer;
module.exports.startHTTPServer = startHTTPServer;
module.exports.startHTTPSServer = startHTTPSServer;