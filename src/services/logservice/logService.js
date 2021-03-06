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

function addLogEntry(logTargetType, logType, logText) {
    if (logTargetType == 0) {
        switch (logType) {
            case 0:
                log.info(logText)
                break;
            case 1:
                log.warn(logText)
                break;
        }
    }

    if (logTargetType == 1) {
        switch (logType) {
            case 0:
                errorlog.info(logText)
                break;
            case 1:
                errorlog.warn(logText)
                break;
        }
    }

    if (logTargetType == 2) {
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

function serverStartedLog() {
    addLogEntry(0, 0, "Server Started! - ", config.version);
    addLogEntry(1, 0, "Server Started! - ", config.version);
    addLogEntry(2, 0, "Server Started! - ", config.version);
}

function addErrorLogErrorEntry(logText) {
    addLogEntry(1, 1, logText);
}

function addInfoLogBasicInfoEntry(logText) {
    addLogEntry(0, 0, logText);
}

/*
    USER LOGS
*/

function registerUserSuccessfullEntry(logText) {
    addInfoLogBasicInfoEntry(logText);
}

function registerUserErrorEntry(logText) {
    addInfoLogBasicInfoEntry("Error registering User! " + logText);
    addErrorLogErrorEntry("Error registering User! " + logText);
}

function updateUserSuccessfullEntry(logText) {
    addInfoLogBasicInfoEntry(logText);
}

function updateUserErrorEntry(logText) {
    addInfoLogBasicInfoEntry("Error Updating User! " + logText);
    addErrorLogErrorEntry("Error Updating User! " + logText);
}

function queryUsersSuccessEntry(logText) {
    addInfoLogBasicInfoEntry(logText);
}

function queryUsersErrorEntry(logText) {
    addInfoLogBasicInfoEntry("Error Query Users! " + logText);
    addErrorLogErrorEntry("Error Query Users! " + logText);
}

function querySingleUserSuccessEntry(logText) {
    addInfoLogBasicInfoEntry(logText);
}

function querySingleUserErrorEntry(logText) {
    addInfoLogBasicInfoEntry("Error Query User! " + logText);
    addErrorLogErrorEntry("Error Query User! " + logText);
}

/*
    USER GROUP LOGS
*/

function registerUserGroupSuccessfullEntry(logText){
    addInfoLogBasicInfoEntry(logText);
}

function registerUserGroupErrorEntry(logText){
    addInfoLogBasicInfoEntry("Error registering User Group! " + logText);
    addErrorLogErrorEntry("Error registering User Group! " + logText);
}

module.exports.addLogEntry = addLogEntry;
module.exports.addErrorLogErrorEntry = addErrorLogErrorEntry;
module.exports.addInfoLogBasicInfoEntry = addInfoLogBasicInfoEntry;
//USER lOGS Exports
module.exports.registerUserSuccessfullEntry = registerUserSuccessfullEntry;
module.exports.registerUserErrorEntry = registerUserErrorEntry;
module.exports.updateUserSuccessfullEntry = updateUserSuccessfullEntry;
module.exports.updateUserErrorEntry = updateUserErrorEntry;
module.exports.queryUsersSuccessEntry = queryUsersSuccessEntry;
module.exports.queryUsersErrorEntry = queryUsersErrorEntry;
module.exports.querySingleUserSuccessEntry = querySingleUserSuccessEntry;
module.exports.querySingleUserErrorEntry = querySingleUserErrorEntry;
//USERGROUP LOGS Exports
module.exports.registerUserGroupSuccessfullEntry = registerUserGroupSuccessfullEntry;
module.exports.registerUserGroupErrorEntry = registerUserGroupErrorEntry;