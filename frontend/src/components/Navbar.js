import React, { useState, useEffect } from 'react';
import axios from './axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useParams
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import Top_questions from './Top_questions';
import My_Answers from './My_Answers';
import My_questions from './My_questions';
import Tags from './Tags';
import Users from './Users';
import './Navbar.css';
import def from "./blank-profile-picture-973460_1280.jpg"
import Search_bar from './Search_bar';
function Navbar() {
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();
    const logout=()=>{
        Cookies.remove('username', { path: '/' });
    }
    useEffect(() => {
        window.addEventListener("beforeunload", (ev) => 
        {
          var temp=localStorage.getItem("is_stored");
          console.log(temp)
          if(temp==1)
          {
            console.log("Keep cookies here")
          }
          else
          {
            // console.log(ev)  
            // ev.preventDefault();
            // return ev.returnValue = 'Hello';
            console.log("Remove cookies here");
            Cookies.remove('username', { path: '/' });;
            // localStorage.removeItem("is_stored")
          }
          
        });
    }, [])
    const [element,setelement]=useState(<Top_questions/>)
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
      <nav className="navbar sticky-top navbar-expand-lg" style={{backgroundColor: "#b3b0b0"}}>
        <div className="container-fluid">

          <button className="btn mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fas fa-bars fa-2x"></i></button>

          <a className="navbar-brand" href="#">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" className="mx-3" height="50"
                    alt="" loading="lazy" />
          </a>
          
          <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-search fa-2x"></i>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex align-items-center w-100 form-search">
              <div className="input-group ps-5">
                {/* <Search_bar/> */}
                <input type="search" className="form-control" placeholder="Search" aria-label="Search" value={value} onChange={onChange} />
              </div>
              <a href="#!" className="text-white"><i className="fas fa-search ps-3"></i></a>
            </form>

            <ul className="navbar-nav d-flex flex-row ms-auto me-3 ps-5">
              <li className="nav-item me-3 me-lg-0 dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-mdb-toggle="dropdown"
                  aria-expanded="false">
                  <img src={cookies.profileImageUrl} className="rounded-circle" height="50"
                    alt="" loading="lazy" onError={(e)=>{e.target.src=def}}/>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1">
                  <li><Link className="dropdown-item" to="/homepage/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" onClick={logout} to="/" >Logout</Link></li>
                </ul>
              </li>
            </ul>
          </div>


        </div>
      </nav>
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
      <div className='container'>
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
              }}>{item.body_text}</Link></h3> */}
              <h3>{item.body_text}</h3>
              <p>
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
                    {/* <a href='#'>{item.owner_display_name}</a> */}
                    <Link to={"/homepage/show_prof/"+item.owner_display_name}>{item.owner_display_name}</Link>
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
      </div>
</>
          </div>
        ))}
    </div>
      {element}
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{width: "300px"}}>
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"> CAQ Menu</h4>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
              <div className='row' id='zxcv'>
                <div className='col-3'>
                <i className="fas fa-globe-asia fa-2x"/>
                </div>
                <div className='col'>
                  <span style={{fontSize:'150%'}} onClick={()=>{setelement(<Top_questions/>)}}>Top Questions</span>
                </div>
              </div> 
          
              <div className='row' id='zxcv'>
                <div className='col-3'>
                <i className="fas fa-question fa-2x"/>
                </div>
                <div className='col'>
                  <span style={{fontSize:'150%'}} onClick={()=>{setelement(<My_questions/>)}}>My Questions</span>
                </div>
              </div>
    
              <div className='row' id='zxcv'>
                <div className='col-3'>
                <i className="fas fa-comments fa-2x"/>
                </div>
                <div className='col'>
                  <span style={{fontSize:'150%'}} onClick={()=>{setelement(<My_Answers/>)}}>My Answers</span>
                </div>
              </div>

            <div className='row' id='zxcv'>
                <div className='col-3'>
                <i className="fas fa-tags fa-2x"/>
                </div>
                <div className='col'>
                  <span style={{fontSize:'150%'}} onClick={()=>{setelement(<Tags/>)}}>Tags</span>
                </div>
            </div> 

            <div className='row' id='zxcv'>
                <div className='col-3'>
                <i className="fas fa-users fa-2x"/>
                </div>
                <div className='col'>
                  <span style={{fontSize:'150%'}} onClick={()=>{setelement(<Users/>)}}> Users</span>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Navbar