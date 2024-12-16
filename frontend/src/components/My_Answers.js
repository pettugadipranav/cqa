import React from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
// import './App.css';
import axios from "./axios";
  function My_Answers() {
    const [cookies, setCookie] = useCookies(['name']);
    
  const [myData, setMyData] = useState([]);

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

  useEffect(() => {
    axios.get('/my_answers/'+cookies.username)// passing the parameter here
        .then((res) => {
          setMyData(res.data) // data which is in syntax but not the data in useState in line 11
        })
        .catch((error)=> console.log(error));
    }, [])

  return (
  <>  
      <div className='container py-4'>
      <div className="row">
          <div className="col-sm-9">
            <h1 className='ps-5'>My Answers</h1>
          </div>
          <div className="col-sm-3">
            <div className="input-group">
            {/* <button type="button" className="btn btn-primary">Ask Question</button> */}
            <Link type="button" to="/homepage/add_quest" className="btn btn-primary" onClick={()=>{
              localStorage.setItem("key",null)
            }}>Ask Question</Link>
            </div>
          </div>
        </div>
        <div className='row py-3'>
        <div className='col-md-6 mb-3'>
          <h4 className='text-muted ps-5'>{myData.length} Answered</h4>
        </div>
        <div className='col-md-6 text-end mb-3'>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-outline-info" disabled>Time</button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  // setMyData([...myData].sort((a, b) => a.creation_date - b.creation_date));
                  setMyData([...myData].sort((a, b) => a.creation_date.localeCompare(b.creation_date)));
                }}><i className="fas fa-sort-amount-up"></i></button>
                
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setMyData([...myData].sort((a, b) => b.creation_date.localeCompare(a.creation_date)));
                }}><i className="fas fa-sort-amount-down"></i></button>
                

                <button type="button" className="btn btn-outline-info" disabled>Upvotes</button>
                

                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setMyData([...myData].sort((a, b) => a.up_vote - b.up_vote));
                }}><i className="fas fa-sort-amount-up"></i></button>
                
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setMyData([...myData].sort((a, b) => b.up_vote - a.up_vote));
                }}><i className="fas fa-sort-amount-down"></i></button>
            </div>
        </div>
      </div>
      {myData.map((post) => {
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
                localStorage.setItem("post_id",post.parent_id)
              }}>{post_title }</Link></h3>
              <p>
              {body_text }
              </p>
              <div className='row text-end mb-1'>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-user-clock "></i>
                  </li>
                  <li className="list-inline-item">
                  <small className="text-muted">Answered On</small>
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
      })}
    </div>
    </>
  );
}
export default My_Answers;