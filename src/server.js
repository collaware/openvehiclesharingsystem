/* Open Vehicle Sharing System v1.0.0 Server */

// Basic Module loading

const fs = require('fs');
const https = require('https');
const http = require('http');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var bodyParser = require('body-parser');
var morgan = require('morgan');


var jwt = require('jsonwebtoken');
var config = require('../src/config/config');
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Service Module loading

if(config.logingEnabled) var logService = require("../src/services/logService/logService");
if(config.authEnabled) var authService = require("../src/services/authService/authService");

switch (config.modelServerType) {
    case 'MNG':
        var modelService = require('../src/model/mongoDB/manager')
        break;

    default:
        var modelService = require('../src/model/mongoDB/manager')
        break;
}

//API
var router = express.Router();
app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to '+ config["serverName:"] + ' server by '+ config.companyName +'!' });
});

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

