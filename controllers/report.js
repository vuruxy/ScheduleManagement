let express = require('express');
let router = express.Router();
let employeeService = require('../models/employee');
let jobService = require('../models/job');

router.get('/', async (req, res) => {
    if (!employeeService.isLogIn(req.session.user)) {
        res.redirect('/login');
    } else {
        let jobs = await jobService.getJobReport();

        res.render('home/report', {
            employee: req.session.user,
            jobs: jobs
        });
    }
});

module.exports = router;