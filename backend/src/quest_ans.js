const express = require('express')
const router = express.Router()
var con = require('./db');


//question answer display
router.get('/:p_id/:vw_nam', (req, res) => {
    var vw_name = req.params.vw_nam;
    var p_id = parseInt(req.params.p_id);
    var Result=[[],[]];
    var Result2=[];
    con.query("select owner_display_name from posts where post_id=?;", [p_id], function (error, result, f)
    {
        con.query("UPDATE posts SET views=views+1 WHERE post_id=?;", [p_id ],function (er, resultko, fieldko) {
            if(er) throw er;
            con.query("UPDATE users SET views=views+1  WHERE display_name=?;",[result[0].owner_display_name],function(erry,resly,feildy){
                if(erry) throw erry;
            })
        });
        
    });

    con.query("select post_type_id from posts where post_id=?", [p_id], function (e, pti, f) {
if (pti[0].post_type_id == 1) {
            var sql1 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.post_id,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date from posts as p where p.post_id=?";


            con.query(sql1, [p_id], function (error1, result1, fields1) {
                var sql2 = "select c.display_name,c.comment_text from comments as c where c.post_id=?;select t.tag_name from tags as t,tag_posts as tp where tp.post_id =? and t.tag_id=tp.tag_id;";
                con.query(sql2, [p_id,p_id], function (error2, result2, fields2) {
                    // if(result2[0]==undefined || result2[0]==null){
                    //     result1[0].comments=[]
                    // }
                    // else{
                        result1[0].comments=result2[0];
                    // }
                    
                    
                    result1[0].upvote_state="card-text btn btn-primary";
                            result1[0].downvote_state="card-text btn btn-primary";
                    // result1[0].tags=result2[1];    
                    result1[0].tags=[]; 

                    for(let j=0;j<result2[1].length;j++){
                        result1[0].tags[j]=result2[1][j].tag_name;
                    }                
                    var Result1 = result1
                    Result[0]=Result1;
                    var sql3 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.post_id,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date from posts as p where p.parent_id=?;";
                    con.query(sql3, [p_id], async function (error3, result3, fields3) {  
                        for(let i=0;i<result3.length;i++){
                            var rarray = await new Promise(function(resolve, reject) {
                                // console.log(result3[i].post_id);
                                var sql4 = "select c.comment_text,c.display_name from comments as c where c.post_id=(?)";
                                con.query(sql4, [result3[i].post_id], function (error4, result4, fields4) {  
                                    // console.log(result4); 
                                    // console.log("--------------");   
                                    resolve(result4);
                                })
                            });
                            // console.log(rarray);
                            result3[i].comments=rarray;
                            // console.log(result3[i]);
                            result3[i].upvote_state="card-text btn btn-primary";
                            result3[i].downvote_state="card-text btn btn-primary";
                            Result2=[...Result2,result3[i]];
                           
                        }
                        Result=[Result1,Result2];
                        // console.log(Result)
                        res.send(Result);
                    })
                })
            })
        }
else {
            con.query("select parent_id from posts where post_id=?", [p_id], function (pb, as) {
                var sql1 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.post_id,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date from posts as p where p.post_id=?";
                con.query(sql1, [pb[0].parent_id], function (error1, result1, fields1) {
                    var sql2 = "select c.display_name,c.comment_text from comments as c where c.post_id=?;select t.tag_name from tags as t,tag_posts as tp where tp.post_id =? and t.tag_id=tp.tag_id;";
                    con.query(sql2, [pb[0].parent_id,pb[0].parent_id], function (error2, result2, fields2) {
                        // if(result2[0]==undefined || result2[0]==null){
                        //     result1[0].comments=[]
                        // }
                        // else{
                            result1[0].comments=result2[0];
                        // }
                        result1[0].upvote_state="card-text btn btn-primary";
                            result1[0].downvote_state="card-text btn btn-primary";
                            result1[0].tags=[]; 

                    for(let j=0;j<result2[1].length;j++){
                        result1[0].tags[j]=result2[1][j].tag_name;
                    }
                        // result1[0].tags=result2[1];                    
                        var Result1 = result1
                        var sql3 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.post_id,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date   from posts as p where p.post_id=?;";
                        con.query(sql3, [p_id], async function (error3, result3, fields3) {                        
                            for(let i=0;i<result3.length;i++){
                                var rarray = await new Promise(function(resolve, reject) {
                                    // console.log(result3[i].post_id);
                                    var sql4 = "select c.comment_text,c.display_name from comments as c where c.post_id=(?)";
                                    con.query(sql4, [result3[i].post_id], function (error4, result4, fields4) {  
                                        // console.log(result4); 
                                        // console.log("--------------");   
                                        resolve(result4);
                                    })
                                });
                                // console.log(rarray);
                                result3[i].comments=rarray;
                                // console.log(result3[i]);
                                result3[i].upvote_state="card-text btn btn-primary";
                                result3[i].downvote_state="card-text btn btn-primary";
                                Result2=[...Result2,result3[i]];
                               
                            }
                            Result=[Result1,Result2];
                            res.send(Result);
                        })
                    })
                })
            })
        }
    })
})


//up_vote,down_vote
router.put('/:p_id/:vw', (req, res) => {
   var v_n=req.params.vw;
   var p_id=req.body.post_id;
   var o_w_d= req.body.owner_display_name; 
   var nuv=req.body.up_vote;
   var ndv=req.body.down_vote;
   var ouv=req.body.oldup_vote;
   var odv=req.body.olddown_vote;
   var iuv=req.body.isup_vote
   var sql="UPDATE posts SET last_edit_date=now(),last_editor_display_name=? where post_id=?;select post_type_id,parent_id from posts where post_id=?;";
   con.query(sql,[v_n,p_id,p_id],function(err,result,fields){
      if(result[1].post__type_id==2){
        con.query("UPDATE posts SET last_edit_date=now(),last_editor_display_name=? where post_id=?;",[v_n,result[1].parent_id],function(error,result,fields){
            if(error) throw error;
        })
      }
   })
   if(iuv){
        var sql1="UPDATE posts SET up_vote=?,down_vote=? where post_id=?;UPDATE users SET up_votes=up_votes+1 where display_name=?;";
        con.query(sql1,[nuv,ndv,p_id,o_w_d],function(err,result1){
        if(err) throw err;
        })
        if(odv!=ndv){
            var sql2="UPDATE users SET down_votes=down_votes-1 where display_name=?;";
            con.query(sql2,[o_w_d],function(error,result2){
                if(error) throw error
            })
        }
   }
   else{
        var sql1="UPDATE posts SET up_vote=?,down_vote=? where post_id=?;UPDATE users SET down_votes=down_votes+1 where display_name=?;";
        con.query(sql1,[nuv,ndv,p_id,o_w_d],function(err,result1){
        if(err) throw err;
        })
        if(ouv!=nuv){
            var sql2="UPDATE users SET up_votes=up_votes-1 where display_name=?;";
            con.query(sql2,[o_w_d],function(error,result2){
            if(error) throw error
            })
        }
   }    
})

//insert comments
router.post('/', (req, res) => {
    console.log(req.body)
    var p_id=req.body.post_id;
    var d_n=req.body.display_name;
    var c_t=req.body.comment_text;
    var sql="UPDATE posts SET last_edit_date=now(),last_editor_display_name=? where post_id=?;select post_type_id,parent_id from posts where post_id=?;";
    con.query(sql,[d_n,p_id,p_id],function(err,result,fields){
      if(result[1].post__type_id==2){
        con.query("UPDATE posts SET last_edit_date=now(),last_editor_display_name=? where post_id=?;",[d_n,result[1].parent_id],function(error,result,fields){
            if(error) throw error;
        })
      }
    })
    var sql1="INSERT into comments(post_id,display_name,comment_text)VALUES (?,?,?);UPDATE posts SET comment_count=comment_count+1 WHERE post_id=?";
    con.query(sql1,[p_id,d_n,c_t,p_id],function(error,result,fields){
        if(error) throw error;
    })
})

///edit answer
router.put('/',(req,res)=>{
    console.log(req.body)
    var l_e_d_n=req.body.owner_display_name;
    var p_t=req.body.post_title;
    var b_t=req.body.body_text;
    var p_id=req.body.post_id;
    var parent_id=req.body.parent_id;
    var sql="UPDATE posts SET last_editor_display_name =(?),last_edit_date=now(),post_title=(?),body_text=(?) WHERE post_id=(?);UPDATE posts SET last_editor_display_name =(?),last_edit_date=now() WHERE post_id=(?);";
    con.query(sql,[l_e_d_n,p_t,b_t,p_id,l_e_d_n,parent_id],function(error,result){
        if(error) throw error;
    })
})

//add answer
router.post('/addans',(req,res)=>{
    var o_d_n=req.body.owner_display_name;
    var l_e_d_n=req.body.last_editor_display_name;
    var i_a_a=false;
    var parent_id=req.body.parent_id;
    var p_t=req.body.post_title;
    var c_l=req.body.content_license;
    var b_t=req.body.body_text;
   
    con.query("UPDATE posts SET last_editor_display_name=(?),last_edit_date=now() WHERE post_id=(?)",[l_e_d_n,parent_id],function(error,re,fie){
        if(error) throw error;
    })
    var sql="insert into posts(owner_display_name ,last_editor_display_name ,last_edit_date ,post_type_id ,is_accepted_answer ,up_vote ,down_vote ,score,parent_id,views,acc_ans_count ,comment_count ,post_title ,content_license,body_text ,creation_date ,closed_date) values(?,?,now(),2,?,0,0,0,?,1,0,0,?,?,?,now(),NULL);";
    con.query(sql,[o_d_n,l_e_d_n,i_a_a,parent_id,p_t,c_l,b_t],function(err,result){
        if(err) throw err
    })
});

//accepted answer
router.post('/acc_ans',(req,res)=>{
    var p_id=req.body.post_id;
    var o_d_n=req.body.owner_display_name;
    var parent_id=req.body.parent_id;
    con.query("UPDATE posts SET last_editor_display_name=?,last_edit_date=now(),is_accepted_answer=true WHERE post_id=?;",[o_d_n,p_id],function(error,result){
        if(error)throw error;
    })
    con.query("UPDATE posts SET  last_editor_display_name=?,last_edit_date=now(),acc_ans_count= acc_ans_count+1 WHERE post_id=?;",[o_d_n,parent_id],function(error,result){
        if(error)throw error;
    })
})

module.exports = router 