const fs = require('fs');
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../../config/config');

const opts = {
    errorEventName: 'error',
    logDirectory: config.basicLogFolder, // NOTE: folder must exist and be writable...
    fileNamePattern: 'log-<DATE>.log',
    dateFormat: 'YYYY.MM.DD',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};
const erroropts = {
    errorEventName: 'error',
    logDirectory: config.basicLogFolder, // NOTE: folder must exist and be writable...
    fileNamePattern: 'error-<DATE>.log',
    dateFormat: 'YYYY.MM.DD',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};
const securityopts = {
    errorEventName: 'error',
    logDirectory: config.basicLogFolder, // NOTE: folder must exist and be writable...
    fileNamePattern: 'security-<DATE>.log',
    dateFormat: 'YYYY.MM.DD',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};

const log = require('simple-node-logger').createRollingFileLogger(opts);
const errorlog = require('simple-node-logger').createRollingFileLogger(erroropts);
const securitylog = require('simple-node-logger').createRollingFileLogger(securityopts);

var zipped = 'archive-' + Date.now() + '.zip'

serverStartedLog();

function addLogEntry(logTargetType,logType,logText){
    if(logTargetType == 0) {
        switch (logType) {
            case 0:
                log.info(logText)
                break;
            case 1:
                log.warn(logText)
                break;
        }
    }

    if(logTargetType == 1) {
        switch (logType) {
            case 0:
                errorlog.info(logText)
                break;
            case 1:
                errorlog.warn(logText)
                break;
        }
    }

    if(logTargetType == 2) {
        switch (logType) {
            case 0:
                securitylog.info(logText)
                break;
            case 1:
                securitylog.warn(logText)
                break;
        }
    }
}

function serverStartedLog(){
    addLogEntry(0,0,"Server Started! - ", config.version);
    addLogEntry(1,0,"Server Started! - ", config.version);
    addLogEntry(2,0,"Server Started! - ", config.version);
}

function addErrorLogErrorEntry(logText){
    addLogEntry(1,1,logText);
}

function addInfoLogBasicInfoEntry(logText){
    addLogEntry(0,0,logText);
}

module.exports.addLogEntry = addLogEntry;
module.exports.addErrorLogErrorEntry = addErrorLogErrorEntry;
module.exports.addInfoLogBasicInfoEntry = addInfoLogBasicInfoEntry;