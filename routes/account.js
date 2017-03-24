var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('这里是account');
});

//login
router.get('/login', function(req, res, next) {
  res.send('这里是account');
});


module.exports = router;


