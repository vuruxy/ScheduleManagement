const e = require('express');
let express = require('express');
let router = express.Router();
let roleService = require('../models/role');

router.get('/', async (req, res) => {
	if (!employeeService.isLogIn(req.session.user)) {
		res.redirect('/login');
	} else {
		let roles = await roleService.getRoles();

		res.render('/role/role', {
			employee: req.session.user,
			roles: roles
		});
	}
});
module.exports = router;