const e = require('express');
let express = require('express');
let router = express.Router();
let jobService = require('../models/job');
let employeeService = require('../models/employee');

router.get('/', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let jobs = req.session.user.canCreateJob ? await jobService.getJobs() :
			await jobService.getJobByEmployeeId(req.session.user.employeeId);

		res.render('job/job', {
			jobs: jobs != null ? jobs : [],
			employee: req.session.user
		});
	}
});
router.get('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let time = [];
		for (i = 6; i <= 18; i = i + 0.5) {
			time.push(Math.trunc(i) + ':' + (i % 1 > 0 ? '30' : '00'));
		}
		res.render('job/addJob', { 
			employee: req.session.user,
			time: time
		});
	}
});
router.post('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await jobService.setJobs({
			jobName: req.body.jobName,
			startDate: req.body.date + ' ' + req.body.startTime,
			endDate: req.body.date + ' ' + req.body.endTime
		});

		res.redirect('/job');
	}
});
router.get('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let updateJob = await jobService.getJobById(req.query.jobId);

		let time = [];
		let startTime =	updateJob.startDate.getHours() + ':' + (updateJob.startDate.getMinutes().toString().length == 1 ? updateJob.startDate.getMinutes() + '0' : updateJob.startDate.getMinutes());
		let endTime = updateJob.endDate.getHours() + ':' + (updateJob.endDate.getMinutes().toString().length == 1 ? updateJob.endDate.getMinutes() + '0' : updateJob.endDate.getMinutes());
		for (i = 6; i <= 18; i = i + 0.5) {
			let t = Math.trunc(i) + ':' + (i % 1 > 0 ? '30' : '00');
			time.push({
				time: t,
				isStartTime: startTime == t,
				isEndTime: endTime == t
			});
		}
		
		res.render('job/updatejob', {
			employee: req.session.user,
			job: {
				jobId: updateJob.jobId,
				jobName: updateJob.jobName,
				jobDate: updateJob.startDate.getFullYear() + '-' + (updateJob.startDate.getMonth() + 1) + '-' + (updateJob.startDate.getDate()),
				startTime: startTime,
				endTime: endTime
			},
			time: time
		});
	}
});
router.post('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await jobService.updateJob({
			jobName: req.body.jobName,
			startDate: req.body.date + ' ' + req.body.startTime,
			endDate: req.body.date + ' ' + req.body.endTime,
			jobId: req.query.jobId
		});

		res.redirect('/job');
	}
});

router.get('/delete', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await jobService.deleteJob(parseInt(req.query.jobId));

		res.redirect('/job');
	}
});



module.exports = router;