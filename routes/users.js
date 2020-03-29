var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.connect();




router.post('/user', function(req, res, next) {
  const {username, password} = req.body;
  var id = -1;
  pool.query('SELECT id FROM users where username = $1 AND password = $2;', [username, password], (err, res_db) => {
    if (err) throw err;
    for (let row of res_db.rows) {
      id = row['id'];
      //console.log(JSON.stringify(id));
      res.send(JSON.stringify(id));
    }
    if(id == -1)res.send(JSON.stringify(id));
  })
});

router.post('/titles', function(req, res, next) {
  const {author} = req.body;
  pool.query('SELECT id, title FROM notes where author = $1;', [author], (err, res_db) => {
    if (err) throw err;
    //console.log(JSON.stringify(res_db.rows));
    res.json(res_db.rows);
  })
});

router.post('/note', function(req, res, next) {
  const {id} = req.body;
  pool.query('SELECT id, title, text FROM notes where id = $1;', [id], (err, res_db) => {
    if (err) throw err;
    //console.log(JSON.stringify(res_db.rows));
    for (let row of res_db.rows) {
      //console.log(JSON.stringify(id));
      res.send(row);
    }
  })
});



module.exports = router;
