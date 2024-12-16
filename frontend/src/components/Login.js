import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Login.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
export default function Login() { 
const [inp,setinp]=useState("");
const [pass,setpass]=useState("");
const [logininp,setlogininp]=useState("");
const [loginpass,setloginpass]=useState("");
const [forgot_name,setforgot_name]=useState("");
const [forgot_error,setforgot_error]=useState("");
const [cookies, setCookie] = useCookies(['name']);
const [is_stored,setis_stored]=useState(false);
const [logrend,setlogrend]=useState("Redd")
useEffect(() => {
  const tempo=cookies.username;
  if(tempo===undefined) console.log("No cookies found")
  else
  {
    navigate("/homepage")
    // alert("Session restored")
  } 
  document.querySelector('.img__btn').addEventListener('click', function() {
    // console.log(document.querySelector('.cont'));
    // console.log(document.querySelector('.cont'));
    document.querySelector('.cont').classList.toggle('s--signup');
});
  setlogrend("Not rebd")
}, [logrend])

const forgot_up=()=>{
  axios.put("/login", {
    name:forgot_name,
  })
  .then((resp) =>{
    setforgot_error("");
    window.location.reload(false);
    alert("Password Updated Successfully!!!!!");
  })
  .catch(function (error) {
    setforgot_error("User name does not exists");
  });
  //setforgot_error
}

const forgot=()=>{
  return (
    <>

    <p hidden>{logrend}</p>
      <p className="text-center"><Link to="#"type="button"  className="text-center"     data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
          Forgot Password?
        </Link></p>

      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Forgot Password?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Username" onChange={(e)=>{setforgot_name(e.target.value)}}/>
              Your password will be changed to username on clicking agree!!
              <br/>
              {forgot_error}
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Dissmiss</button> */}
              {/* <button type="button" className="submit" onClick={logger}>Sign In</button> */}
              <button type="button" className="subbit" onClick={forgot_up}>Agree</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const signer= ()=>{
  axios.post("/login", {
    name:inp,
    password:pass,
  })
  .then((resp) =>{
      alert("Account created successfully!!")
    // console.log(resp.statusCode);
    window.location.reload(false);
  })
  .catch(function (error) {
    alert("User name already exists try with another user name!!!")
  });
}

const logger=()=>{
  axios.post("/login/signin" ,{
      user:logininp,
      password:loginpass,
  })
  .then((resp)=>{
    console.log(resp.data)
    console.log(is_stored)
    setCookie('username', logininp, { path: '/' });
    setCookie('profileImageUrl', resp.data.profileImageUrl, { path: '/' });
    if(is_stored===true)  localStorage.setItem("is_stored",1);
    else localStorage.setItem("is_stored",0);
    navigate("/homepage")
    // localStorage.setItem("username:", logininp);
    // console.log(localStorage.getItem("username:"));
  })
    .catch(function (error) {
      // console.log(error)
    alert("User name or password incorrect")
  });
}

const navigate = useNavigate();

  return (
          <>   
      <div className='qwerty' >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="cont">
          <div className="form sign-in">
              <h2>Welcome to our CAQ Website!!!</h2>
              <label>
                  <span><strong>Username</strong></span>
                  <input type="email" onChange={(e)=>{setlogininp(e.target.value)}}/>
              </label>
              <label>
                  <span><strong>Password</strong></span>
                  <input type="password" onChange={(e)=>{setloginpass(e.target.value)}}/>
              </label>
              {/* <div class="group">
              <input className="forgot-pass" type="checkbox" checked={is_stored} onChange={()=>{setis_stored(!is_stored)}}></input>
              <p className="forgot-pass"><strong>Remember me!!</strong></p>
              </div> */}
              <div className="row">
              <div className='col'>
                <p className="forgot-pass" hidden><strong>Remember</strong></p>
              </div>
              <div className='col'>
                <div className="btn-group my-3" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-light btn-sm"><input className="form-check checkbox-lg" type="checkbox" checked={is_stored} onChange={()=>{setis_stored(!is_stored)}}/></button>
                  
                  <button type="button" className="btn btn-light btn-sm" disabled>Remember me!!</button>
                </div>
              </div>
              <div className='col'>
                <p className="forgot-pass" hidden><strong>Remember</strong></p>
              </div>
            </div>
              {/* <div className="row py-3">
                <div className='col'>
                    <p className="forgot-pass" hidden><strong>Remember me!!</strong></p>
                </div>
                <div className='col'>
                  <input className="forgot-pass my-3" type="checkbox" checked={is_stored} onChange={()=>{setis_stored(!is_stored)}}></input>
                </div>
                <div className='col'>
                  <p className="forgot-pass"><strong>Remember me!!</strong></p>
                </div>
                <div className='col'>
                  <p className="forgot-pass" hidden><strong>Remember me!!</strong></p>
                </div>
              </div> */}
                      
              <button type="botton" className="sbit" onClick={logger}>Sign In</button>

              {forgot()}    
          </div>

          <div className="sub-cont">
              <div className="img">
                  <div className="img__text m--up">
                  
                      <h3>Don't have an account? Please Sign up!</h3>
                  </div>
                  <div className="img__text m--in">
                  
                      <h3>If you already has an account, just sign in.</h3>
                  </div>
                  <div className="img__btn">
                      <span className="m--up">Sign Up</span>
                      <span className="m--in">Sign In</span>
                  </div>
              </div>
              <div className="form sign-up">
                  <h2>Create your Account</h2>
                  <label>
                      <span>Username</span>
                      <input type="text" onChange={(e)=>{setinp(e.target.value)}}/>
                  </label>
                  {/* <label>
                      <span>Email</span>
                      <input type="email" />
                  </label> */}
                  <label>
                      <span>Password</span>
                      <input type="password" onChange={(e)=>{setpass(e.target.value)}}/>
                  </label>
                  <button type="button" className="subbit" onClick={signer}>Sign Up</button> 
              </div>
          </div>
      </div>
      </div>
    

            {/* <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Username</label>
    <div className="col-sm-10">
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Username" onChange={(e)=>{setlogininp(e.target.value)}}/>
    </div>
  </div>

  <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label" >Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" onChange={(e)=>{setloginpass(e.target.value)}} placeholder='Password'/>
    </div>
  </div>

  <button type="button" className="btn btn-outline-success" onClick={logger} >Login</button>
  
  
  <div className="form-check">
  <input className="form-check-input" type="checkbox" checked={is_stored}  onChange={()=>{setis_stored(!is_stored)}} id="flexCheckDefault"/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Remember me!!
  </label>
</div> */}

{/* className="btn btn-primary" */}

{/* {forgot()} */}

  {/* {sign_up()} */}

          </>
      )
  }