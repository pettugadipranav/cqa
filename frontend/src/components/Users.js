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
        const res = await axios.get("/users");
        setmyData1(res.data);
        var tempo=[];
        var i;
          for(i=0;i<res.data.length;i++)
          {
            tempo[i]=res.data[i].display_name
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
      axios.get("/users") // passing the parameter here
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
        <div className='col-md-6 mb-3'>
            <form className="d-flex align-items-center w-75 form-search">
                {/* <div className="input-group ps-5">
                <input type="search" className="form-control" placeholder="Search users" aria-label="Search" />
          </div>   */}
                
      <div className="search-container">
        <div className="input-group ps-5">
          <input type="search" className='form-control my-3' placeholder="Search users" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> <i class="mx-3 fas fa-search"></i> </button>
        </div>
        <div className="dropdown">
          {data.filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.display_name.toLowerCase();
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .map((item) => (
            <div
                onClick={() => onSearch(item.display_name)}
                className="dropdown-row"
                key={item.display_name}
              >
              <div className="card hover-shadow p-3 mb-2">
                  <div className='row'>
                      <div className="d-flex flex-row align-items-center">
                          <img src={item.profile_image_url} className="rounded-circle mx-3" height="50"
                          alt="Not found" loading="lazy" />

                          <div className="ms-2 c-details" >
                              <h4 className="mb-0"><em><Link to={"/homepage/show_prof/"+item.display_name}>{item.display_name}</Link>
                              </em></h4> 
                              <span><i class="fas fa-bullseye"></i> <em>{item.reputation}</em></span>
                              <p><i class="fas fa-trophy"></i> <em>{rankings(item.reputation)}</em></p>
                          </div>
                      </div>
                  </div>
                  <div className='row text-left'>
                      <p><em>Last accessed : </em>{timegetter(item.last_access_date)}</p>  
                  </div>
              </div>
            </div>
            ))}
        </div>
      </div> 
          </form>
        </div>

        <div className='col-md-6 text-end mb-3'>
          <div className="btn-group" role="group" aria-labmyData1="Basic outlined example">
                {/* doubt here */}
                
                <button type="button" className="btn btn-outline-info" disabled>Last seen</button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  // setMyData([...myData].sort((a, b) => a.creation_date - b.creation_date));
                  setmyData1([...myData1].sort((a, b) => a.last_access_date.localeCompare(b.last_access_date)));
                }}><i className="fas fa-sort-amount-up"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  // setMyData([...myData].sort((a, b) => a.creation_date - b.creation_date));
                  setmyData1([...myData1].sort((a, b) => b.last_access_date.localeCompare(a.last_access_date)));
                }}><i className="fas fa-sort-amount-down"></i></button>
                <button type="button" className="btn btn-outline-info" disabled>Reputation</button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setmyData1([...myData1].sort((a, b) => a.reputation - b.reputation));
                }}><i className="fas fa-sort-amount-up"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setmyData1([...myData1].sort((a, b) => b.reputation - a.reputation));
                }}><i className="fas fa-sort-amount-down"></i></button>
                {/* doubt here */}
          </div>
        </div>
      </div>

      <div className='row my-4'>
      {myData1.map((post) => {
        return   <div className='col-md-3 mx-6'>
        <div className="card hover-shadow p-3 mb-2">
                <div className='row'>
                    <div className="d-flex flex-row align-items-center">
                        <img src={post.profile_image_url} className="rounded-circle mx-3" height="50"
                        alt="Not found" loading="lazy" />

                        <div className="ms-2 c-details" >
                            <h4 className="mb-0"><em><Link to={"/homepage/show_prof/"+post.display_name}>{post.display_name}</Link></em></h4> 
                            
                            <span><i class="fas fa-bullseye"></i> <em>{post.reputation}</em></span>
                            <p><i class="fas fa-trophy"></i> <em>{rankings(post.reputation)}</em></p>
                        </div>
                    </div>
                </div>
                <div className='row text-left'>
                    <p><em>Last accessed : </em>{timegetter(post.last_access_date)}</p>  
                </div>
            </div>
    </div>
      })}
    
</div>
    </div>
    </>
  );
}