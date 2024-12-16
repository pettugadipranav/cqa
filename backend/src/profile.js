const express = require('express')
const router = express.Router()
const con =require("./db")


router.get('/:acc_nam', (req, res) => {
  console.log(req.params.acc_nam)
    var acc_name=req.params.acc_nam;
    con.query("select U.display_name,U.account_id,U.password,U.reputation,U.up_votes,U.down_votes,U.views,U.website_url,U.creation_date, U.about_me,U.profile_image_url from users as U where U.display_name=(?) ;",[acc_name], function (err, result1, fields) {
      con.query("select B.name,B.work_location from badges as B where B.account_id=(?);",[result1[0].account_id],function(error,result2){
      var result=[...result1,...result2]
        res.send(result);  
      })

    });
  })


  router.post('/:acc_nam', (req, res) => {
    var acc_name=req.params.acc_nam;
    var password=req.body.password;
    var web_url=req.body.website_url;
    var abt_me =req.body.about_me;
    var pic_url=req.body.profile_image_url;
    var acc_id;
    var nam =req.body.name;
    var work_loc =req.body.work_location;
    con.query("select account_id from users where display_name=(?);",[acc_name],function(err,re){
      acc_id=re[0].account_id;
      acc_id=parseInt(acc_id);
    
      var sql1 = "UPDATE users SET password=(?),website_url=(?),about_me=(?),profile_image_url=(?) WHERE display_name=(?);";
      con.query(sql1,[password,web_url,abt_me,pic_url,acc_name], function (err, result) {
        if (err) throw err;
      });
      var sql2="insert into badges(account_id,name,work_location) values(?,?,?)"
      var sql3 = "UPDATE badges SET name=(?),work_location=(?)where account_id=(?);";

 
        con.query(sql2,[acc_id,nam,work_loc], function (error, result) {
          if (error) { con.query(sql3,[nam,work_loc,acc_id], function (err, result) {
            if (err) ;
          });}
        });
      
     
    })
     
   })


module.exports = router