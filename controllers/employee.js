const e = require('express');
let express = require('express');
let router = express.Router();
let roleService = require('../models/role');
let employeeService = require('../models/employee');

router.get('/', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		if (req.session.user.canCreateEmployee) {
			let employees = await employeeService.getEmployees();
			res.render('employee/employee', {
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
		
		res.render('employee/addEmployee', { 
			employee: req.session.user, 
			roles: roles 
		});
	}
});

router.post('/add', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.setEmployee({
			name: req.body.name,
			phone: req.body.phone,
			address: req.body.address,
			username: req.body.username,
			password: req.body.password,
			roleId: parseInt(req.body.roleId)
		});
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
			roles: roles.map(role => {
				return {
					roleId: role.roleId,
					roleName: role.roleName,
					isSelected: role.roleId == updateEmployee.roleId
				}
			}),
			updateEmployee: updateEmployee
		});
	}
});

router.post('/update', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.updateEmployee({
			name: req.body.name,
			phone: req.body.phone,
			address: req.body.address,
			username: req.body.username,
			password: req.body.password,
			roleId: parseInt(req.body.roleId),
			employeeId: parseInt(req.query.employeeId)
		});

		if (req.session.user.canCreateEmployee) {
			res.redirect('/employee');
		} else {
			res.redirect('/employee/update?employeeId=' + req.session.user.employeeId);
		}
	}
});

router.get('/delete', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		await employeeService.deleteEmployee(req.query.employeeId);

		res.redirect('/employee');
	}
});


module.exports = router;