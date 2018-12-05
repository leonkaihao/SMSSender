'use strict';
const https = require("../net/httpsReq")
//console.log(process.env.SMS_KEY, process.env.SMS_SECRET);

var sms = exports = module.exports = {
    //send: send a msg to sms service
    //param smsObj includes from, to and message
    //param cb(err, data)
    send: function(smsObj, cb) {
        const options = {
            hostname: "api.transmitsms.com",
            port:443,
            path: "/send-sms.json",
            method: "POST",
            auth: process.env.SMS_KEY+":"+process.env.SMS_SECRET,
            rejectUnauthorized: false , 
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          };
          const dataobj = {
            message: smsObj.message,
            to: smsObj.to,
            from: smsObj.from
          };
          https.httpsReq(options, dataobj, function(data){
            cb(null, data);
          }, function(err) {
            cb(err, null);
          })
    }
};