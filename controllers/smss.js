'use strict';
var smss = require("../services/smss");
var sessions = require("../services/sessions");

exports.sendSMS = function(token, smsObj, cb) {
    smss.send(smsObj, function(err, results) {
        let result = {source: "webui"};
        let statusCode = 200;
        if (err) {
            statusCode = 400;
            result.code = 'e0001',
            result.message = err.message;
        }        
        result.data = results;
        cb(statusCode, result);
    });
};
