let express = require('express');
let router = express.Router();
let employeeService = require('../models/employee');

router.get('/', async (req, res) => {
    if (employeeService.isLogIn(req.session.user)) {
        res.redirect('/home');
    } else { 
        res.render('login');
    }
});

module.exports = router;