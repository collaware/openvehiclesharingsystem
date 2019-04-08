/* Open Vehicle Sharing System v1.0.0 Server */

// Basic Module loading

const fs = require('fs');
const https = require('https');
const http = require('http');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mssql = require('mssql');
var path = require('path');

var zipFolder = require('bestzip');

var cron = require('node-cron');

var jwt = require('jsonwebtoken');
var config = require('../src/config/config');
var Secret = config.secret;

// Service Module loading

if(config.logingEnabled) var logService = require("../src/services/logService/logService");
if(config.authEnabled) var authService = require("../src/services/authService/authService");

// Server START

var server = require('../src/services/serverService/serverService');

if(config.httpsEnabled){
    server.startHTTPSServer(app,config.httpsServerPort);
} else {
    if(config.httpEnabled){
        server.startHTTPServer(app,config.httpServerPort);
    } else {
        if(!config.httpsEnabled) server.startHTTPDefaultServer(app);
    }
}

