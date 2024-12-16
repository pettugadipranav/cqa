// const express = require('express')
// const router = express.Router()
// const path = require('path')
// const db=require('./db.js')


// router.get('/', function(req, res) {
//   // const owner_name = req.body.owner_display_name;
//   // const owner_name = 'Teja';
//   var sql = 'SELECT owner_display_name, last_editor_display_name, last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date from posts where post_type_id = 1 order by views DESC;';
//   db.query(sql,  function (err, data) {
//   if (err) throw err;
//   res.send(data)
//   console.log(data)
// });
// });

// module.exports = router

// const express = require('express')
// const router = express.Router()
// const path = require('path')
// const db=require('./db')


// router.get('/', function(req, res) {
//   // const owner_name = req.body.owner_display_name;
//   // const owner_name = 'Teja';
//   var sql = 'SELECT owner_display_name, last_editor_display_name,last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date from posts where post_type_id = 1 order by views DESC;';
//   db.query(sql,  function (err, data) {
//   // if (err) throw err;
//   // res.send(data)
//   // console.log(data)
//   for (let index = 0; index < data.length; index++) {
//     // const element = array[index];
//     var sql1 = " SELECT count(*) as answ_count from posts where parent_id = (?);";
//     db.query(sql1,[data[index].post_id], function(err, data1){
//         data[index].answercount = data1[0].answ_count;
//         if(err)throw err;
//         if(index==data.length-1){
//           res.send(data);
//           console.log(data1)
//           }
//     })
//   }

// });
// });

// module.exports = router

const express = require('express')
const router = express.Router()
const path = require('path')
const db=require('./db')


router.get('/', function(req, res) {
  // const owner_name = req.body.owner_display_name;
  // const owner_name = 'Teja';
  var sql = 'SELECT post_id, owner_display_name, last_editor_display_name,last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date from posts where post_type_id = 1 order by views DESC;';
  db.query(sql,  function (err, data) {
  console.log(data)
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