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
			roles: roles.map((role) => { return {
				roleId: role.roleId,
				roleName: role.roleName,
				canViewReport: role.canViewReport == '1' ? true : false,
				canCreateEmployee: role.canCreateEmployee == '1' ? true : false,
				canAssginJob: role.canAssginJob == '1' ? true : false,
				canCreateJob: role.canCreateJob == '1' ? true : false
			}})
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
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await roleService.setRoles({
			roleName: req.body.roleName,
			canViewReport: req.body.canViewReport ? 1 : 0,
			canCreateEmployee: req.body.canCreateEmployee ? 1 : 0,
			canAssginJob: req.body.canAssginJob ? 1 : 0,
			canCreateJob: req.body.canCreateJob ? 1 : 0
		});
		res.redirect('/role');
	}
});

router.get('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let role = await roleService.getRole(req.query.roleId);

		res.render('role/updateRole', {
			employee: req.session.user,
			role: {
				roleId: role.roleId,
				roleName: role.roleName,
				canViewReport: role.canViewReport == '1' ? true : false,
				canCreateEmployee: role.canCreateEmployee == '1' ? true : false,
				canAssginJob: role.canAssginJob == '1' ? true : false,
				canCreateJob: role.canCreateJob == '1' ? true : false
			}
		});
	}
});

router.post('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await roleService.updateRole({
			roleId: parseInt(req.query.roleId),
			roleName: req.body.roleName,
			canViewReport: req.body.canViewReport ? 1 : 0,
			canCreateEmployee: req.body.canCreateEmployee ? 1 : 0,
			canAssginJob: req.body.canAssginJob ? 1 : 0,
			canCreateJob: req.body.canCreateJob ? 1 : 0
		});

		res.redirect('/role');
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