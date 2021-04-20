const e = require('express');
let express = require('express');
let router = express.Router();
let roleService = require('../models/role');
let employeeService = require('../models/employee');

router.get('/', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();

		res.render('role/role', {
			employee: req.session.user,
			roles: roles
		});
	}
});
router.get('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();
		res.render('role/addRole', { role: req.session.user, roles: roles });
	}
});

router.post('/add', async (req, res) => {
	console.log(req.body);
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		res.render('role/addRole', {
			employee: req.session.user
		});
	}
});

router.get('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let role = await roleService.getRole();
		let updateRole = await roleService.getRole(req.query.roleId);

		res.render('role/updateRole', {
			employee: req.session.user,
			role: role,
			updateRole: updateRole
		});
	}
});

router.post('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		res.render('role/updateRole', {
			employee: req.session.user,
			roleName: req.body.roleName,
			canViewReport: req.body.canViewReport,
			canCreateEmployee: req.body.canCreateEmployee,
			canAssignJob: req.body.canAssignJob,
			canCreateJob: req.body.canCreateJob
		});
	}
});

router.post('/delete', async (req, res) => {
	if (!employeeService.isLogIn(req.session.roleId)) {
		res.redirect('/login');
	} else {
		res.render('/views/notification/alert', {
			role: req.session.user,
			title: "Roles Management",
			message: "Role has been deleted",
			redirect: '/role',
			redirectMessage: "Go Back To Role"
		});
	}
});


module.exports = router;