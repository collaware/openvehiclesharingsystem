var express = require('express');
var config = require('../../config/config');
let mongoose;
let User;
let Group;
let management;
var router = express.Router();
if(config.logingEnabled) var logService = require("../logService/logService");
if(config.authEnabled) var authService = require("../authService/authService");
var jwt = require('jsonwebtoken');


switch (config.modelServerType) {
    case 'MNG':
        mongoLoader()
        break;

    default:
        mongoLoader()
        break;
}

function mongoLoader(){
    mongoose = require('mongoose');
    User = require('../../model/mongoDB/user');
    Group = require('../../model/mongoDB/group');
    management = require('../../model/mongoDB/management');
    management.connectToDB();
}

function addNewUser(data, callback){
    management.registerUser(data, User, callback);
}

function getAllUsers(Login, callback){
    management.getAllUsers(Login, User ,callback);
}

module.exports.addNewUser = addNewUser;
module.exports.getAllUsers = getAllUsers;