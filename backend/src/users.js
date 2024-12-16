const express = require('express')
const router = express.Router()
const path = require('path')
const conn=require('./db.js')

router.get('/', function(req, res) {
    // const owner_name = req.params.acc_nam;
  //   const owner_name = 'Teja';
    var sql = 'select * from users';
    conn.query(sql, function (err, data) {
    if (err) throw err;
    res.send(data)
  });
  });
module.exports = router