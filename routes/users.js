var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://yfkpgdvcubwpqc:1660f925c79b2b18e82db076d82d21878468405b182641f778147c6aa845080a@ec2-46-137-84-173.eu-west-1.compute.amazonaws.com:5432/d74dbu5iqo08d0",
  ssl: true
});

pool.connect();




router.post('/user', function(req, res, next) {
  const {username, password} = req.body;
  var id = -1;
  pool.query('SELECT id FROM users WHERE username = $1 AND password = $2;', [username, password], (err, res_db) => {
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
  pool.query('SELECT id, title FROM notes WHERE author = $1;', [author], (err, res_db) => {
    if (err) throw err;
    //console.log(JSON.stringify(res_db.rows));
    res.json(res_db.rows);
  })
});

router.post('/note', function(req, res, next) {
  const {id} = req.body;
  pool.query('SELECT id, title, note FROM notes WHERE id = $1;', [id], (err, res_db) => {
    if (err) throw err;
    //console.log(JSON.stringify(res_db.rows));
    for (let row of res_db.rows) {
      //console.log(JSON.stringify(id));
      res.send(row);
    }
  })
});

router.post('/noteEdit', function(req, res, next) {
  const {id, title, note} = req.body;
  //console.log("edsd");
  pool.query('UPDATE notes SET title = $1, note = $2 WHERE id = $3;', [title, note, id], (err, res_db) => {
    if (err) throw err;
    //console.log(err, res);
  })
});

router.post('/noteAdd', function(req, res, next) {
  const {author, title, note} = req.body;
  pool.query('INSERT INTO notes(author, title, note)VALUES($1, $2, $3) returning id;', [author, title, note], (err, res_db) => {
    if (err) console.log(err), res.send(JSON.stringify(err));
    else{
      console.log(res_db);
      res.json(res_db.rows);
    }
  })
});

router.post('/userAdd', function(req, res, next) {
  const {username, password} = req.body;
  var id = -1;
  pool.query('INSERT INTO users(username, password)VALUES($1, $2) returning id;', [username, password], (err, res_db) => {
    if (err) throw err;
    for (let row of res_db.rows) {
      id = row['id'];
      //console.log(JSON.stringify(id));
      res.send(JSON.stringify(id));
    }
    if(id == -1)res.send(JSON.stringify(id));
  })
});

router.post('/noteDelete', function(req, res, next) {
  const {id} = req.body;
  pool.query('DELETE FROM notes WHERE id = $1;', [id], (err, res_db) => {
    if (err) console.log(err);
    else{
      console.log(res_db);
    }
  })
});



module.exports = router;
