var express = require('express');
var router = express.Router();
var smss = require("../controllers/smss");
//post an SMS
router.post('/', function(req, res, next) {
	smss.sendSMS(req.query.token, req.body.data.sms, function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

module.exports = router;
