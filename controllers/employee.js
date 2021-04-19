const e = require('express');
let express = require('express');
let router = express.Router();
let roleService = require('../models/role');
let employeeService = require('../models/employee');

router.get('/employee', function (req, res) {
	res.render('employee');
});

router.get('/employee', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		if (req.session.user.createEmployee) {
			let employees = await employeeService.getEmployees();

			res.render('views/employee/employee', {
				employees: employees,
				employee: req.session.user
			});
		} else {
			res.redirect('/employee/updateEmployee?employeeId=' + req.session.user.employeeId);
		}
	}
});

router.get('/employee/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();
		res.render('views/employee/addemployee', { employee: req.session.user, roles: roles });
	}
});

router.post('/employee/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.setEmployee({
			employeeName: req.body.employeeName,
			employeePhone: req.body.employeePhone,
			employeeAddress: req.body.employeeAddress,
			username: req.body.username,
			password: req.body.password,
			roleId: req.body.roleId
		});

		res.redirect('/employee');
	}
});

router.get('/employee/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();
		let updateEmployee = await employeeService.getEmployeeById(req.session.user);

		res.render('views/employee/updateEmployee', {
			employee: req.session.user,
			roles: roles,
			updateEmployee: updateEmployee
		});
	}
});

router.post('/employee/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.updateEmployee({
			employeeName: req.body.employeeName,
			employeePhone: req.body.employeePhone,
			employeeAddress: req.body.employeeAddress,
			username: req.body.username,
			password: req.body.password,
			roleId: req.body.roleId,
			employeeId: parseInt(req.body.employeeId)
		});

		res.redirect('/employee');
	}
});

router.get('/employee/delete', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.deleteEmployee(req.query.employeeId);

		res.render('/views/notification/alert', {
			employee: req.session.user,
			title: "Employee Management",
			message: "Employee has been deleted",
			redirect: '/employee',
			redirectMessage: "Go Back To Employee"
		});
	}
});


module.exports = router;