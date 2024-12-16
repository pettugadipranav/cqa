const express = require('express')
const router = express.Router()
const path = require('path')
const db=require('./db.js')


router.get('/', function(req, res) {
  const owner_name = req.params.acc_nam;
  var sql = 'select * from tags;';
  db.query(sql, function (err, data) {
  if (err) throw err;
  res.send(data)
});
});

module.exports = router