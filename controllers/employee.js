const e = require('express');
let express = require('express');
let router = express.Router();
let roleService = require('../models/role');
let employeeService = require('../models/employee');

router.get('/', function (req, res) {
	res.render('employee/employee');
});

router.get('/', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		if (req.session.user.createEmployee) {
			let employees = await employeeService.getEmployees();

			res.render('views/employee', {
				employees: employees,
				employee: req.session.user
			});
		} else {
			res.redirect('/updateEmployee?employeeId=' + req.session.user.employeeId);
		}
	}
});

router.get('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();
		res.render('employee/addEmployee', { employee: req.session.user, roles: roles });
	}
});

router.post('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.setEmployee({
			Name: req.body.employeeName,
			Phone: req.body.employeePhone,
			Address: req.body.employeeAddress,
			username: req.body.username,
			password: req.body.password,
			roleId: req.body.roleId
		});
		console.log(req.body);

		res.redirect('/employee');
	}
});

router.get('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();
		let updateEmployee = await employeeService.getEmployeeById(req.query.employeeId);

		res.render('employee/updateEmployee', {
			employee: req.session.user,
			roles: roles,
			updateEmployee: updateEmployee
		});
	}
});

router.post('/update', async (req, res) => {
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

router.get('/delete', async (req, res) => {
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