const express = require('express')
const router = express.Router()
const path = require('path')
const db=require('./db')


router.get('/', function(req, res) {
  // const owner_name = req.params.acc_nam;
  var sql = "select * from posts where post_type_id=1;";
  db.query(sql, function (err, data) {
  if (err) throw err;
  res.send(data)
});
});

module.exports = router