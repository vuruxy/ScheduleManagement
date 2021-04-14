var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('home', {
    test1: 'test1',
    childContext: {
      testing1: 'testing1',
      testing2: 'testing2'
    }
  });
});

module.exports = router;