var express = require('express');
var router = express.Router();

const users = []

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

router.post('/user', function(req, res, next) {
  const {username, password} = req.body;
  users.push({username, password});
  res.send({success: true});
});

module.exports = router;
