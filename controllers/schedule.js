let express = require('express');
let router = express.Router();
let employeeService = require('../models/employee');
let jobService = require('../models/job');
let config = require('../config.json');

router.get('/', async (req, res) => {
    if (!employeeService.isLogIn(req.session.user)) {
        res.redirect('/login');
    } else { 
        let employees = await employeeService.getEmployees();
        let unAssignJobs = await jobService.getUnAssignJobs();
        let time = [];
		for (i = config.startTime; i <= config.endTime; i = i + 0.5) {
			time.push({
                key: (Math.trunc(i) + ':' + (i % 1 > 0 ? '30' : '00')).toString().replace(':', ''),
                value: Math.trunc(i) + ':' + (i % 1 > 0 ? '30' : '00')
            });
        }
        
        res.render('schedule/schedule', {
            employee: req.session.user,
            employees: employees,
            unAssignJobs: unAssignJobs,
            time: time
         });
    }
});

router.post('/getJob', async (req, res) => {
    let jobs = await jobService.getAssignJobByEmployeeId(req.body.employeeId, req.body.startDate, req.body.endDate);

    res.send({
        jobs: jobs 
    });
});

router.post('/assignJob', async (req, res) => {
    await jobService.assignJob(req.body.employeeId, req.body.jobId);

    res.send();
});

router.post('/setJobDone', async (req, res) => {
    await jobService.doneJob(req.body.jobId, req.body.isDone);

    res.send();
});

router.post('/getJobById', async (req, res) => {
    let job = await jobService.getJobByJobId(req.body.jobId);

    res.send(job);
});

module.exports = router;