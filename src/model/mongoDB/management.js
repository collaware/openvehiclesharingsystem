var mongoose = require('mongoose');
var config = require('../../config/config');
if(config.logingEnabled) var logService = require("../../services/logService/logService");
if(config.authEnabled) var authService = require("../../services/authService/authService");

function connectToDB(){
    var dbUri = 'mongodb://' + config.modelServerUser + ":" + config.modelServerPwd + "@" + config.modelServerAddress + ":" + config.modelServerPort + "/" + config.modelServerDataBase;
    mongoose.connect(dbUri, { useNewUrlParser: true });
}

function getAllUsers(Login, User, callback) {
    User.find({}, function(err, users) {
        if (err) {
            var done = { 'success': false, 'message': 'Authentication failed or User not found. At Function 100', 'error': err }
            if(config.logingEnabled) logService.queryUsersErrorEntry(Login + ' 100 ' + true + " result: " + done + " error: " + err);
            callback(done);
        } else {
            var done = { 'success': false, 'message': 'Successful, User Found! At Function 100', 'user': users };
            if(config.logingEnabled) logService.queryUsersSuccessEntry(Login + ' 100 ' + false + " reuslt: " + done);
            callback(done);
        }
    });
}

function findByLogin(Login, callback) {
    User.findOne({ login: Login }, function(err, user) {
        if (err) {
            var done = { 'success': false, 'message': 'Authentication failed or User not found. At Function 101', "Error": err };
            systemLogService.createLog(Login, '101', true, done);
            callback(done);
        } else {
            if (!user) {
                var done = { 'success': false, 'message': 'User Not found in database! At Function 101', 'user': user };
                systemLogService.createLog(Login, '101', false, done);
                callback(done);
            } else {
                var done = { 'success': true, 'message': 'Successful, User Found! At Function 101', 'user': user };
                systemLogService.createLog(Login, '101', false, done);
                callback(done);
            }
        }
    });
}

function registerUser(data, User, callback) {
    var nick = new User({
        login: data.login,
        pwd: data.pwd,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        isAdmin: data.isAdmin,
        isActive: data.isActive,
        groups: data.groups
    });

    nick.save(function(err) {
        if (err) {
            var done = { 'success': false, 'message': 'Authentication failed or User not found. At Function 102', "Error": err };
            if(config.logingEnabled) logService.registerErrorEntry('Log Done at Function 102, ' + Date.now() + " result: " + done + " error: " + err);
            callback(done);
        } else {
            var done = { 'success': true, 'message': 'User Register Succesful At Function 102', 'user': nick };
            if(config.logingEnabled) logService.registerSuccessfullEntry('Log Done at Function 102, ' + Date.now() + " " + done);
            callback(done)
        }
    });
}

module.exports.connectToDB = connectToDB;
module.exports.getAllUsers = getAllUsers;
module.exports.registerUser = registerUser;