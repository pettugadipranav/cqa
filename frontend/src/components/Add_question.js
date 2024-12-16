import React, { useState, useEffect } from 'react';
import axios from "./axios";
import AutoComplete from "./autocompletetags";
import {
  Link,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
function Add_question() {
  const navigate = useNavigate();
  const [myPost, setmyPost] = useState({
    title : " ",
    body_text : " ",
    Tags: [],
    lisc:" ",
    post_id:""
  });
  const [name,setname]=useState("")
  //////////////////////////////////////////////////
    const enter_app=(e)=>{
      if(e.key==="Enter" && name!=="")
      {
        setmyPost({...myPost,Tags:[...myPost.Tags,name]})
        setname("") 
      }
      console.log(myPost);
  }
  const del_this_tag=(e)=>{
      var x=e.currentTarget.getAttribute("data-value");
      // settags()
      setmyPost({...myPost,Tags:[...[...myPost.Tags.filter((value) => value != x)]]})
    }
  /////////////////////////////////////////////////
  
  useEffect(() => {
    var retrievedObject = localStorage.getItem("key");
    console.log('retrievedObject: ',JSON.parse(retrievedObject));
    // localStorage.removeItem("key")
    if(JSON.parse(retrievedObject)==null||JSON.parse(retrievedObject)==undefined)
    {
      axios.post("/add_quest", myPost)
    .then(response => {
      return(axios.get("/add_quest"))
    })
    .then(res2=>setmyPost({...myPost,post_id:res2.data.post_id}))
    }
    else
    {
      var tempy=JSON.parse(retrievedObject)
      var temp2={}
      // tempy.tags=[...JSON.parse(retrievedObject).tags]
      temp2={title:tempy.post_title,body_text:tempy.body_text,lisc:"License 1",post_id:tempy.post_id,Tags:tempy.tags}
      setmyPost(temp2)
    }
    
  }, [])
  
    const handleSubmit = (e) => {
      e.preventDefault()
      var somp = localStorage.getItem("tags");
      console.log('retrievedObject: ',JSON.parse(somp));
      var tempx= JSON.parse(somp)
      var kom=myPost;
      kom.Tags=tempx;
      setmyPost(kom)
      localStorage.removeItem("tags");
      // console.log(tempx)
      axios.put("/add_quest",myPost)
        .then(response=>{
          console.log(response)
        })
        navigate(-1)
        // window.location.reload(false);
    }
    const [myData1, setmyData1] = useState([""]);
      const [isError1, setisError1] = useState("");
      const [tag_arr,settag_arr]=useState([""])
      const getMyPostData = async () => 
      {
        try {
          const res = await axios.get("/tag");
          setmyData1(res.data);
          // console.log(res.data[1]) 
          var tempo=[];
          var i;
            for(i=0;i<res.data.length;i++)
            {
              tempo[i]=res.data[i].tag_name
            }
            // console.log(tempo);
            settag_arr(tempo)
        } catch (error) {
          setisError1(error.message);
        }
      };
      useEffect(() => {
        getMyPostData(); 
      }, []);

  return (
    <>
    <div className='container py-4' id='asdfg'>
        <h1><strong>Ask a public question</strong></h1>

        <div className="card  w-75 my-5">
            <div className="card-body">
                <h4><strong>Writing a good question</strong></h4>
                <p>The followings steps will help guide you through the process to write question in a good format such that it is easy for others to understand.</p>
                <h5><strong>Steps :</strong></h5>
                <ul>
                    <li>
                        <p>
                         <strong>Writing a good title : </strong>
                         <span> Summarize your problem in a one-line title.</span>
                        </p>
                    </li>
                    <li>
                        <p>
                         <strong>Expand on the problem : </strong>
                         <span>Describe your problem in more detail.Show what you`ve tried, tell us what happened, and why it didn`t meet your needs.</span> 
                        </p>
                    </li>
                    <li>
                        <p>
                         <strong>Adding tags : </strong>
                         <span>Tags help ensure that your question will get attention from the right people.</span> 
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div className="card  w-75">
            <div className="card-body">
                <h5><strong>Title</strong></h5>
                <p><small>Be specific and imagine you`re asking a question to another person.</small></p>
                <input type="text" className="form-control" placeholder="Type your title..." value={myPost.title} onChange={(e) => setmyPost({...myPost,title:e.target.value})}></input>
            </div>
        </div>
        <div className="card  w-75 my-2">
            <div className="card-body">
                <h5><strong>What are the details of your problem?What did you try and what were you expecting?</strong></h5>
                <p><small>Introduce the problem and expand on what you put in the title.Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.</small></p>
                <textarea className="form-control" rows="7" value={myPost.body_text} onChange={(e) => setmyPost({...myPost,body_text:e.target.value})} ></textarea>
            </div>
        </div>


        <div className="card  d-inline-block  w-75 my-2">
            <div className="card-body">
                <h5><strong>Tags</strong></h5>
                <p><small>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</small></p>
                {/* <input type="text" id="myInput" className="form-control" placeholder="Search Tag names" aria-label="Search" value={name} onKeyPress={e=>{enter_app(e)}} onChange={e => {setname(e.target.value)}}/> */}
                {/* {AutoComplete()} */}
                <AutoComplete options = {tag_arr} />
            </div>
            <div className="d-inline-block mb-3 mx-3">
            {
                myPost.Tags.map(e=>{
                return(
                    <>
                    <div className="btn-group me-2" role="group" aria-label="Second group">
                    <button type="button" className="btn btn-dark"><i className="fas fa-tag"></i> {e}</button>
                    <button className="btn btn-dark" data-value={e} type="button" id="button-addon2" onClick={del_this_tag}><i className="fas fa-times"></i></button>
                    </div>
                    </>
                    )
                })
            }
            </div>
        </div>

        <div className="card w-75 my-2">
            <div className="card-body">
                <h5><strong>Content license</strong></h5>
                <p><small>A content licensing agreement allows companies to repurpose or republish material through a legal contract</small></p>
                <input type="text" className="form-control" placeholder="Add your genuine license..." value={myPost.lisc} onChange={e => setmyPost({...myPost,lisc:e.target.value})} ></input>
            </div>
        </div>   

        <div className='my-5'>
            <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Post or update your question </button>
            <button type="button" className="btn btn-danger mx-3" 
              onClick={() => {
                localStorage.removeItem("key")
                navigate(-1)
              }}
            >Discard your question</button>
        </div>
    </div>
    </>
  )
}

export default Add_question