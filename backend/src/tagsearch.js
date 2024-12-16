const path = require('path')
const express = require('express')
const router = express.Router()
const conn = require("./db.js")

router.post('/', (req, res) => {
    console.log(req.body.Tags);
    //TODO: send questions for given list of tags
    var rec = "";
    for (i = 0; i < req.body.Tags.length; i++) {
        console.log(req.body.Tags[i])
        rec = rec + req.body.Tags[i] + " ";
    }
    console.log(rec)
    rec = rec.trim()
    var tags = rec.split(" ");
    // console.log(tags)
    var str = " (B.tag_name='" + tags[0] + "' ";
    //or B.tag_name='C' //end here
    for (i = 1; i < tags.length; i++) {
        str = str + "or B.tag_name='" + tags[i] + "' "
    }
    str = str + ") )"
    var pre_query = "with sampl (post_id) as " +
        " ( " +
        "select distinct A.post_id as post_id " +
        "FROM tag_posts as A,tags as B " +
        "WHERE A.tag_id=B.tag_id and ";
    var pos_query = "select E.post_id,E.owner_display_name,E.last_editor_display_name,E.last_edit_date,E.up_vote,E.down_vote,E.score,E.acc_ans_count,E.post_title,E.content_license,E.body_text,E.creation_date,E.closed_date" +
        " from posts as E,sampl as C " +
        " WHERE E.post_id=C.post_id and post_type_id=1; ";
    // console.log(pre_query+str+pos_query);
    console.log(pre_query + str + pos_query)
    conn.query(pre_query + str + pos_query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)

    })
})
module.exports = router