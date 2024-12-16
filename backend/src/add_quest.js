var express = require('express');
const router = express.Router()
var db = require('./db.js');

// takes values from frontend and inserts into database
router.post('/', (req, res) => {
  var name1  = req.body.name;
  var sql = "INSERT INTO posts (owner_display_name, last_editor_display_name, last_edit_date, post_type_id, is_accepted_answer, up_vote, down_vote, score, parent_id, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date) VALUES (?, ?, NOW(), 1, false, 0, 0, 0, 0, 1, 0, 0, ?, '', ?, NOW(), NULL); ";
  db.query(sql, [name1, name1, '', ''], ( err, result) => {
    if (err) throw err;
    
    res.send()
    // send response
  });
});

  router.get('/', function(req, res, next) {
  var sql='SELECT LAST_INSERT_ID() into @var1; select @var1 as post_id;'; // post_id
  db.query(sql, function (err, data, fields) {
    console.log(data[1][0].post_id)
    if (err) throw err;
    res.send({post_id:data[1][0].post_id})
    });
  });

// { title: 'poke', body_text: 'pots', Tags: [ 'Python' ], lisc: 'asas' }
router.put('/', function(req, res){
  console.log(req.body)
  var sql = " DELETE from tag_posts where post_id = '" + req.body.post_id + "' ;UPDATE posts SET post_title = '"+ req.body.title + "', body_text = '"+ req.body.body_text +"', content_license = '"+ req.body.lisc +"' where post_id = '"+ req.body.post_id +"' ";
  db.query(sql, function(err){
    for (let index = 0; index < req.body.Tags.length; index++) {
      var sql1 = "select tag_id from tags where tag_name = '" + req.body.Tags[index]+ "' into @var2;insert into tag_posts values(" + req.body.post_id + ", @var2);";
      db.query(sql1, function (err,res2) {
          if(err) throw err;
          if(index+1==req.body.Tags.length) res.send("HEllo")
      })
    }    
  })
})
  
module.exports = router;