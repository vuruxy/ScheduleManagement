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
		res.render('/job/addjob', { employee: req.session.user });
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
		let updateJob = await jobService.getjobById(req.query.jobId);

		res.render('views/job/updatejob', {
			employee: req.session.user,
			job: {
				jobId: updateJob[0].jobId,
				jobName: updateJob[0].jobName,
				date: updateJob[0].startDate.getFullYear() + '-' + (updateJob[0].startDate.getMonth() + 1) + '-' + (updateJob[0].startDate.getDay() + 1),
				startTime: updateJob[0].startDate.getHours() + ':' + (updateJob[0].startDate.getMinutes().toString().length == 1 ? updateJob[0].startDate.getMinutes() + '0' : updateJob[0].startDate.getMinutes()),
				endTime: updateJob[0].endDate.getHours() + ':' + (updateJob[0].endDate.getMinutes().toString().length == 1 ? updateJob[0].endDate.getMinutes() + '0' : updateJob[0].endDate.getMinutes())
			}
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
			jobId: req.body.jobId
		});

		res.redirect('/job');
	}
});

router.get('/delete', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await jobService.deleteJob(parseInt(req.query.jobId));

		res.render('views/notification/alert', {
			employee: req.session.user,
			title: "Job Management",
			message: "Job is deleted successfuly",
			redirect: "/job",
			redirectMessage: "Go Back To Job"
		});
	}
});



module.exports = router;