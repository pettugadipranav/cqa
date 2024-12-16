const express = require('express')
const app = express()
const path = require('path')
const port = 5000
var cors = require('cors')



app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log("Backend reciever start **********")
    console.log("Type:  "+req.method)
    console.log("URL:  "+req.path);
    console.log("DATA:  "+req.body);
    console.log("Backend reciever end ******")
    next();
})


app.get('/',(req, res)=>{
  res.send("This is home page")
})
app.post('/',(req, res)=>{
  res.send("This is home page")
})
const route1=require("./src/login.js")
const tag=require("./src/tag.js")
const profile=require("./src/profile.js")
const top_questions=require("./src/top_questions.js")
const my_questions=require("./src/my_questions.js")
const my_answers=require("./src/my_answers.js")
const users=require("./src/users.js")
const add_quest=require("./src/add_quest.js")
const quest_ans=require("./src/quest_ans")
const tagsearch=require("./src/tagsearch")
const search=require("./src/search")
app.use('/login',route1)
app.use('/tag',tag)
app.use('/profile',profile)
app.use('/top_questions',top_questions)
app.use('/my_questions',my_questions)
app.use('/my_answers',my_answers)
app.use('/users',users)
app.use('/add_quest',add_quest)
app.use('/quest_ans',quest_ans)
app.use('/tagsearch',tagsearch)
app.use('/search',search)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})