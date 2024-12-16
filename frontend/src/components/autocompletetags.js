import { useState, useEffect, useRef } from "react";
import axios from "./axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";
const AutoComplete = ({ options = [""] }) => {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // With this check, the code will not call the toLowerCase() method on a null or undefined option, and the error will be fixed.
  const suggestions = options.filter(
    (option) => option && option.toLowerCase().includes(value.toLowerCase())
  );

  const autocompleteRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) 
      {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
  };

  /* for appending the tags */
  const [myPost, setmyPost] = useState({ // sending the Tags array
    title: "",
    body_text: "",
    Tags: [],
    lisc: "",
  });
  const [name, setName] = useState("");
  const [val,setVal]=useState('') // for dropdown
  const [sins,setsins]=useState("")
  const enter_app = (e) => {
    console.log("pop")
    if (e.key === "Enter" && name !== "") {
      setmyPost({ ...myPost, Tags: [...myPost.Tags, name] });
      setName("");
      var tempo=[]
      tempo=[...myPost.Tags, name]
      localStorage.setItem("tags",JSON.stringify(tempo))
      // localStorage.setItem("tags",)
      setsins("")
    }
  };

 /* for deleting the tag */

  const del_this_tag = (e) => {
    var x = e.currentTarget.getAttribute("data-value");
    setmyPost({
      ...myPost, Tags: [...myPost.Tags.filter((value) => value !== x)],
    });
  };

/*********************************************/

const [myData1, setmyData1] = useState([]);
const timegetter=(p_date)=>{
  // const date = new Date(p_date);
const now = new Date(p_date);
const nowTimezoneOffset = now.getTimezoneOffset();
const givenOffset = -5.5 * 60*60; // Convert 5:30 hours to minutes
// const givenOffset = 0; // Convert 5:30 hours to minutes
const originalNowTime = new Date(now.getTime() + (nowTimezoneOffset * 60 * 1000) - (givenOffset * 1000));
const options = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour12: true,
  // timeZone: 'UTC'
};
const formattedDate = originalNowTime.toLocaleString('en-US', options);
  return(
    <>
    {formattedDate}
    </>
  )
}
const handleSubmit2 = e => {
  e.preventDefault()

  axios.post("/tagsearch", myPost)
    .then(response => {
      console.log(response.data)
      setmyData1(response.data);
    })
}

  return (
<div className="autocomplete" ref={autocompleteRef}>
        <div className='col-md-6 mb-3'>
            <div className="d-flex align-items-center w-75 form-search">
                <div className="input-group ps-5">
                  <input type="text" id="myInput" value={sins}className="form-control" placeholder="Search Tag names" aria-label="Search" list="data"
  onFocus={() => setShowSuggestions(true)}
  onKeyPress={(e) => {
    enter_app(e);
  }}
  onChange={(e) => {
    setName(e.target.value);
    handleChange(e);
    setVal(e.target.value);
    setsins(e.target.value)
  }}/>
                </div>
                <a href="#!" className="text-dark" onClick={handleSubmit2} ><i className="fas fa-search ps-3"></i></a>
            </div>
        </div>

    {/* search for question for the multiple tags */}

    

         <datalist id="data">
                {suggestions.map((suggestion)=>
                <option>
                    {suggestion} 
                </option>)}
            </datalist>
        {/* completed */}

   {/* this is for apended tags */}
      {myPost.Tags.length > 0 && (
        <ul className="tags">
          {myPost.Tags.map((tag) => (
            <div className="d-inline-block">
            <div className="btn-group me-2" role="group" aria-label="Second group">
              <button type="button" className="btn btn-dark"><i className="fas fa-tag"></i> {tag}</button>
              <button className="btn btn-dark" data-value={tag} type="button" id="button-addon2" onClick={del_this_tag}><i className="fas fa-times"></i></button>
            </div>
            </div>
          ))}
        </ul>
      )}
      {myData1.map((post) => {
        const { owner_display_name, last_editor_display_name, last_edit_date, is_accepted_answer, up_vote, down_vote, score, views, acc_ans_count, comment_count, post_title, content_license, body_text, creation_date, closed_date , answercount} = post;
        return  <div className="card my-3">
        <div className="card-body">
          <div className='row'>
            <div className='col-2'>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-thumbs-up"></i> Likes</small>
               </div> 
               <div className='col'>
                 {up_vote }
               </div> 
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-thumbs-down"></i> dis</small>
               </div> 
               <div className='col'>
               {down_vote }
               </div> 
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-bullseye"></i> Score</small>
               </div>
               <div className='col'>
               {score } 
               </div>
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-eye"></i> Views</small>
               </div>
               <div className='col'>
               {views }
               </div>
              </div>
            </div>
            <div className='col'style={{borderLeft: "6px solid orange"}}>
              <h3><Link to="/homepage/quest" onClick={()=>{
                localStorage.setItem("post_id",post.post_id)
              }}>{post_title }</Link></h3>
              <p>
              {body_text }
              </p>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted">Answers</small> {answercount}
               </div>
               <div className='col text-end'>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-user-clock "></i>
                  </li>
                  <li className="list-inline-item">
                  <small className="text-muted">Posted by</small>
                  </li>
                  <li className="list-inline-item">
                    <a href='#'>{owner_display_name}</a>
                  </li>
                  <li className="list-inline-item">
                  <small className="text-muted">On</small>
                  </li>
                  <li className="list-inline-item">
                    {timegetter(creation_date)}
                  </li>
                </ul>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      })}
    </div>
  );
};

export default AutoComplete;