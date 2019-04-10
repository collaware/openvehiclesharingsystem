var express = require('express');
var config = require('../../config/config');
let mongoose;
let User;
let Group;
let management;
var router = express.Router();
if (config.logingEnabled) var logService = require("../logService/logService");
if (config.authEnabled) var authService = require("../authService/authService");
var jwt = require('jsonwebtoken');


switch (config.modelServerType) {
    case 'MNG':
        mongoLoader()
        break;

    default:
        mongoLoader()
        break;
}

function mongoLoader() {
    mongoose = require('mongoose');
    User = require('../../model/mongoDB/user');
    Group = require('../../model/mongoDB/userGroup');
    management = require('../../model/mongoDB/management');
    management.connectToDB();
}

function addNewGroup(data, callback){
    management.registerGroup(data, Group, callback);
}

function getAllUserGroup(data,callback){
    management.getAllUserGroups(data.name, Group, callback);
}

function findUserGroupByName(data, callback){
    management.findUserGroupByName(data.name,Group,callback)
}

function updateUserGroup(data, callback){
    management.updateUserGroup(data, Group, callback);
}

module.exports.addNewGroup = addNewGroup;
module.exports.getAllUserGroup = getAllUserGroup;
module.exports.findUserGroupByName = findUserGroupByName;
module.exports.updateUserGroup = updateUserGroup;