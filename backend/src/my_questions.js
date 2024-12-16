const express = require('express')
const router = express.Router()
const path = require('path')
const db=require('./db.js')


router.get('/:acc_nam', function(req, res) {
  const owner_name = req.params.acc_nam;
//   const owner_name = 'Teja';
  var sql = 'SELECT post_id,owner_display_name, last_editor_display_name, last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date from posts where owner_display_name = (?) and post_type_id = 1;';
  db.query(sql, [owner_name],  function (err, data) {
  if (err) throw err;
  for (let index = 0; index < data.length; index++) {
    // const element = array[index];
    var sql1 = " SELECT count(*) as answ_count from posts where parent_id = (?);";
    db.query(sql1,[data[index].post_id], function(err, data1){
      console.log(data[index].post_id)
        data[index].answercount = data1[0].answ_count;
         console.log(data1)
        if(index==data.length-1){
          res.send(data);
          }
    })
  }
});
});

module.exports = router