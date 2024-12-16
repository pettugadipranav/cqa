const express = require('express')
const router = express.Router()
const path = require('path')
const db=require('./db')


router.get('/:acc_nam', function(req, res) {
  const owner_name = req.params.acc_nam;
  // const owner_name = 'Teja';
  var sql = 'SELECT post_id,parent_id,owner_display_name, last_editor_display_name, last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date from posts where owner_display_name = (?) and post_type_id = 2;';
  db.query(sql, [owner_name],  function (err, data) {
  if (err) throw err;
  res.send(data)
});
});

module.exports = router