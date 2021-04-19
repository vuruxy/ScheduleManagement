let express = require('express');
let router = express.Router();
let employeeService = require('../models/employee');

router.get('/', async (req, res) => {
  if (!employeeService.isLogIn(req.session.user)) {
      res.redirect('/login');
  } else { 
      res.render('home/home', {
          employee: req.session.user
      });
  }
});

module.exports = router;