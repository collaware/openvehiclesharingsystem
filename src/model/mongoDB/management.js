var mongoose = require('mongoose');
var config = require('../../config/config');
if (config.logingEnabled) var logService = require("../../services/logService/logService");
if (config.authEnabled) var authService = require("../../services/authService/authService");

function connectToDB() {
    var dbUri = 'mongodb://' + config.modelServerUser + ":" + config.modelServerPwd + "@" + config.modelServerAddress + ":" + config.modelServerPort + "/" + config.modelServerDataBase;
    mongoose.connect(dbUri, {
        useNewUrlParser: true
    });
}

/* 
    USER MANAGEMENT 
*/

function getAllUsers(Login, User, callback) {
    User.find({}, function (err, users) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User not found. At Function 100',
                'error': err
            }
            if (config.logingEnabled) logService.queryUsersErrorEntry(Login + ' F100 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            var done = {
                'success': true,
                'message': 'Successful, User Found! At Function 100',
                'user': users
            };
            if (config.logingEnabled) logService.queryUsersSuccessEntry(Login + ' F100 ' + false + " reuslt: " + JSON.stringify(done));
            callback(done);
        }
    });
}

function findUserByLogin(Login, User, callback) {
    User.findOne({
        login: Login
    }, function (err, user) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User not found. At Function 101',
                "Error": err
            };
            if (config.logingEnabled) logService.querySingleUserErrorEntry(Login + ' F101 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            if (!user) {
                var done = {
                    'success': false,
                    'message': 'User Not found in database! At Function 101',
                    'user': user
                };
                if (config.logingEnabled) logService.querySingleUserSuccessEntry(Login + ' F101 ' + false + " result " + JSON.stringify(done));
                callback(done);
            } else {
                var done = {
                    'success': true,
                    'message': 'Successful, User Found! At Function 101',
                    'user': user
                };
                if (config.logingEnabled) logService.querySingleUserSuccessEntry(Login + ' F101 ' + false + " result: " + JSON.stringify(done));
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

    nick.save(function (err) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User not found. At Function 102',
                "Error": err
            };
            if (config.logingEnabled) logService.registerUserErrorEntry('Log Done at Function F102, ' + Date.now() + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            var done = {
                'success': true,
                'message': 'User Register Succesful At Function 102',
                'user': nick
            };
            if (config.logingEnabled) logService.registerUserSuccessfullEntry('Log Done at Function F102, ' + Date.now() + " " + JSON.stringify(done));
            callback(done)
        }
    });
}

function updateUser(data, User, callback) {
    User.findOne({
        login: data.login
    }, function (err, user) {
        if (err) {
            var done = {
                'success': false,
                'message': 'User Update Error! At Function F103',
                'error': err
            };
            if (config.logingEnabled) logService.updateUserErrorEntry(data.login + ' F103 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(err);
        } else {
            if (data.pwd != undefined) user.pwd = data.pwd;
            if (data.email != undefined) user.email = data.email;
            if (data.firstName != undefined) user.firstName = data.firstName;
            if (data.lastName != undefined) user.lastName = data.lastName;
            if (data.isAdmin != undefined) user.isAdmin = data.isAdmin;
            if (data.isActive != undefined) user.isActive = data.isActive;
            if (data.groups != undefined) user.groups = data.groups;

            user.save(function (err, updatedUser) {
                if (err) {
                    var done = {
                        'success': false,
                        'message': 'User Update Error! At Function 103',
                        'error': err
                    };
                    if (config.logingEnabled) logService.updateUserErrorEntry(data.login + ' F103 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
                    callback(done);
                } else {
                    var done = {
                        'success': true,
                        'message': 'User Update Succesful At Function 103',
                        'updatedUser': updatedUser
                    };
                    if (config.logingEnabled) logService.updateUserSuccessfullEntry(data.login + ' F103 ' + false + " result: " + JSON.stringify(done));
                    callback(done);
                }
            });
        }
    });
}

/*
    GROUP MANAGEMENT
*/

function getAllUserGroups(Login, Group, callback) {
    Group.find({}, function (err, groups) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User Group not found. At Function 104',
                'error': err
            }
            if (config.logingEnabled) logService.queryUsersErrorEntry(Login + ' F104 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            var done = {
                'success': true,
                'message': 'Successful, User Group Found! At Function 104',
                'groups': groups
            };
            if (config.logingEnabled) logService.queryUsersSuccessEntry(Login + ' F104 ' + false + " reuslt: " + JSON.stringify(done));
            callback(done);
        }
    });
}

function findUserGroupByName(Name, Group, callback) {
    Group.findOne({
        name: name
    }, function (err, group) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User Group not found. At Function 105',
                "Error": err
            };
            if (config.logingEnabled) logService.querySingleUserErrorEntry(Name + ' F105 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            if (!user) {
                var done = {
                    'success': false,
                    'message': 'User Group Not found in database! At Function 105',
                    'group': group
                };
                if (config.logingEnabled) logService.querySingleUserSuccessEntry(Name + ' F105 ' + false + " result " + JSON.stringify(done));
                callback(done);
            } else {
                var done = {
                    'success': true,
                    'message': 'Successful, User Found! At Function 101',
                    'group': group
                };
                if (config.logingEnabled) logService.querySingleUserSuccessEntry(Name + ' F105 ' + false + " result: " + JSON.stringify(done));
                callback(done);
            }
        }
    });
}

function registerGroup(data, Group, callback) {
    var nick = new Group({
        name: data.name,
        description: data.description,
        adminId: data.adminId
    });

    nick.save(function (err) {
        if (err) {
            var done = {
                'success': false,
                'message': 'Authentication failed or User not found. At Function 106',
                "Error": err
            };
            if (config.logingEnabled) logService.registerUserGroupErrorEntry('Log Done at Function F106, ' + Date.now() + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(done);
        } else {
            var done = {
                'success': true,
                'message': 'Group Register Succesful At Function 102',
                'group': nick
            };
            if (config.logingEnabled) logService.registerUserGroupSuccessfullEntry('Log Done at Function F106, ' + Date.now() + " " + JSON.stringify(done));
            callback(done)
        }
    });
}

function updateUserGroup(data, Group, callback) {
    Group.findOne({
        login: data.name
    }, function (err, Group) {
        if (err) {
            var done = {
                'success': false,
                'message': 'User Group Update Error! At Function F103',
                'error': err
            };
            if (config.logingEnabled) logService.updateUserErrorEntry(data.name + ' F103 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
            callback(err);
        } else {
            if (data.name != undefined) user.name = data.name;
            if (data.description != undefined) user.description = data.description;
            if (data.adminId != undefined) user.adminId = data.adminId;
            Group.save(function (err, updatedUserGroup) {
                if (err) {
                    var done = {
                        'success': false,
                        'message': 'User Update Error! At Function 103',
                        'error': err
                    };
                    if (config.logingEnabled) logService.updateUserErrorEntry(data.name + ' F103 ' + true + " result: " + JSON.stringify(done) + " error: " + JSON.stringify(err));
                    callback(done);
                } else {
                    var done = {
                        'success': true,
                        'message': 'User Update Succesful At Function 103',
                        'updatedUserGroup': updatedUserGroup
                    };
                    if (config.logingEnabled) logService.updateUserSuccessfullEntry(data.name + ' F103 ' + false + " result: " + JSON.stringify(done));
                    callback(done);
                }
            });
        }
    });
}

//DB CONNECT Export
module.exports.connectToDB = connectToDB;
//USERMGMT Export
module.exports.getAllUsers = getAllUsers;
module.exports.findUserByLogin = findUserByLogin;
module.exports.registerUser = registerUser;
module.exports.updateUser = updateUser;
//GROUPMGMT Export
module.exports.registerGroup = registerGroup;
module.exports.getAllUserGroups = getAllUserGroups;
module.exports.findUserGroupByName = findUserGroupByName;
module.exports.updatedUserGroup = updateUserGroup;