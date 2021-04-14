var express = require('express');
var router = express.Router();

router.get('/employee', function (req, res) {
	res.render('employee');
})

module.exports = router;