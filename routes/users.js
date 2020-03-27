var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.connect();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(pool);
});

router.post('/user', function(req, res, next) {
  const {username, password} = req.body;
  var id = -1;
  pool.query('SELECT id FROM users where username = $1 AND password = $2;', [username, password], (err, res_db) => {
    if (err) throw err;
    for (let row of res_db.rows) {
      id = row['id'];
      res.send(JSON.stringify(id))
    }
    if(id == -1)res.send(JSON.stringify(id))
  })
  
});




module.exports = router;
