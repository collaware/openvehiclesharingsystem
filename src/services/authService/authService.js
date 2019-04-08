var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../../config/config');

function authentication(creds, callback) {
    
}

module.exports.authentication = authentication;