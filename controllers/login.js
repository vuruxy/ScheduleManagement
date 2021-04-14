const e = require('express');
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

router.post('/', async (req, res) => {
    console.log(req.body);
    if (await employeeService.isAuthenticate(req.body.username, req.body.password)) {
        await employeeService.setLogIn(req.session, req.body.username);
        res.redirect('/');
    } else {
        res.send('Password is Wrong');
    }
});

router.get('/logout', (req, res) => {
    employeeService.setLogOut(req.session);
    res.redirect('/login');
});

module.exports = router;