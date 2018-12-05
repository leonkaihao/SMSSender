
const https = require('https');
const querystring = require('querystring');

exports.httpsReq = function(options, dataObj, successcb, failcb) {

    let agentReq = https.request(options, function (agentRes) {
        let chunks = [];
        if (agentRes.statusCode >= 400) {
            let errMsg = new Error('Failed to request url: https://' + 
                options.hostname + options.path + 
                ', return status code ' + agentRes.statusCode);
            failcb(errMsg);
            console.log(errMsg);
            return;
        }
        let dataSize = 0;
        agentRes.on('data', function (chunk) {
            chunks.push(chunk);
            dataSize += chunk.length;
        });
        agentRes.on('end', function () {
            let fullData = Buffer.concat(chunks, dataSize);
            if (dataSize != 0) {
                if (fullData) {
                    try {
                        fullData = JSON.parse(fullData);
                    } catch (err) {
                        console.error(err);
                        failcb(err);
                    }
                } 
            }         
            successcb(fullData);
        });
    });
    agentReq.on('error', function (e) {
        failcb(e.message);
    });
    if (dataObj) {
        let sendData = querystring.stringify(dataObj);
        agentReq.write(sendData);
    }
    agentReq.end();
};





