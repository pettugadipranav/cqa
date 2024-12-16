import React, { useState, useEffect } from 'react';
import axios from './axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
 
export default function Users() {
  function rankings(rep){
    var out;
    if(rep <= 2000)  out = "Bronze";
    else if(rep > 2000 && rep <= 5000) out = "Silver";
    else if(rep > 5000 && rep <= 10000) out = "Gold";
    else out = "Platinum";
    return out;
  }
  const timegetter=(p_date)=>{
    const now = new Date(p_date);
    const nowTimezoneOffset = now.getTimezoneOffset();
    const givenOffset = -5.5 * 60*60; // Convert 5:30 hours to minutes
    const originalNowTime = new Date(now.getTime() + (nowTimezoneOffset * 60 * 1000) - (givenOffset * 1000));
    const options = {
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

    const [value, setValue] = useState("");

    const onChange = (event) => {
      setValue(event.target.value);
    };    
    const onSearch = (searchTerm) => {
      setValue(searchTerm);
      // our api to fetch the search result
      console.log("search ", searchTerm);
    };
  
    const [myData1, setmyData1] = useState([""]);
    const [isError1, setisError1] = useState("");
    const [tag_arr,settag_arr]=useState([""])
    //"python" c++ "java"

    // using Async Await
    const getMyPostData = async () => 
    {
      try {
        const res = await axios.get("/search");
        console.log(res.data)
        setmyData1(res.data);
        var tempo=[];
        var i;
          for(i=0;i<res.data.length;i++)
          {
            tempo[i]=res.data[i].body_text
          }
          settag_arr(tempo)
      } catch (error) {
        setisError1(error.message);
      }
    };
    // TagName: 'comments'
    // NOTE:  calling the function
    useEffect(() => {
      getMyPostData(); 
    }, []);

    const [data, setdata] = useState([]);
    useEffect(() => {
      axios.get("/search") // passing the parameter here
          .then((res) => {
            setdata(res.data) // data which is in syntax but not the data in useState in line 11
          })
          .catch((error)=> console.log(error));
      }, [])
  return (
<>
<div className='container my-3'>
    <h1 className='ps-5'>Users</h1>
  <div className='row'>
    {/* <div className='col-md-6 mb-3'> */}
        <form className="d-flex align-items-center w-75 form-search">
            <div className="input-group ps-5">
            {/* <input type="search" className="form-control" placeholder="Search users" aria-label="Search" /> */}
            <div className="search-container">
    <div className="search-inner">
      <input type="text" value={value} onChange={onChange} />
      <button onClick={() => onSearch(value)}> Search </button>
    </div>
    <div className="dropdown">
      {data.filter((item) => {
          const searchTerm = value.toLowerCase();
          const fullName = item.body_text.toLowerCase();
          return (
            searchTerm &&
            fullName.startsWith(searchTerm) &&
            fullName !== searchTerm
          );
        })
        .map((item) => (
          <div
            onClick={() => onSearch(item.body_text)}
            className="dropdown-row"
            key={item.body_text}
          >
<>
<div className="card my-4">
        <div className="card-body">
          <div className='row'>
            <div className='col-2'>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-thumbs-up"></i> Likes</small>
               </div> 
               <div className='col'>
                 {item.up_vote }
               </div> 
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-thumbs-down"></i> dis</small>
               </div> 
               <div className='col'>
               {item.down_vote }
               </div> 
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-bullseye"></i> Score</small>
               </div>
               <div className='col'>
               {item.score } 
               </div>
              </div>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted"><i className="fas fa-eye"></i> Views</small>
               </div>
               <div className='col'>
               {item.views }
               </div>
              </div>
            </div>
            <div className='col'style={{borderLeft: "6px solid orange"}}>
              {/* <h3><Link to="/homepage/quest" onClick={()=>{
                localStorage.setItem("post_id",item.post_id)
              }}>{item.post_title }</Link></h3> */}
              <p>
              {item.body_text }
              </p>
              <div className='row mb-1'>
               <div className='col'>
                <small className="text-muted">Answers</small> {item.answercount}
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
                    <a href='#'>{item.owner_display_name}</a>
                  </li>
                  <li className="list-inline-item">
                  <small className="text-muted">On</small>
                  </li>
                  <li className="list-inline-item">
                    {timegetter(item.creation_date)}
                  </li>
                </ul>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</>
          </div>
        ))}
    </div>
  </div>
            </div>
        </form>
    {/* </div> */}

  </div>
</div>
</>

  );
}