var mongoose = require('mongoose');
var config = require('../../config/config');

function connectToDB(){
    var dbUri = 'mongodb://' + config.modelServerUser + ":" + config.modelServerPwd + "@" + config.modelServerAddress + ":" + config.modelServerPort + "/" + config.modelServerDataBase;
    mongoose.connect(dbUri, { useNewUrlParser: true });
}

module.exports.connectToDB = connectToDB;