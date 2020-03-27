var express = require('express');
var router = express.Router();

/*
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://yfkpgdvcubwpqc:1660f925c79b2b18e82db076d82d21878468405b182641f778147c6aa845080a@ec2-46-137-84-173.eu-west-1.compute.amazonaws.com:5432/d74dbu5iqo08d0',
//  connectionString: process.env.DATABASE_URL,  
  ssl: true,
});

pool.connect();

pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
