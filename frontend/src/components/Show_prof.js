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

export default function Show_Prof() {
    const params = useParams();

const navigate = useNavigate();
const [value, setValue] = useState({
    shift : true,
    edit_btn : false,
    save_btn : true
  });

  const edit_toggle = ()=> {
    if(value.shift === true){
      setValue({
        shift : false,
        edit_btn : true,
        save_btn : false
      })
    }
    else{
      setValue({
        // shift : false,
        edit_btn : true,
        save_btn : false
      })
    }
  }
  const [cookies, setCookie] = useCookies(['name']);
  const [myData, setmyData] = useState(   {
      display_name : " ",
      rank : " ",
      reputation : " ",
      up_votes : " ",
      down_votes : " ",
      views : " ",
      account_id : " ",
      password : "1234",
      name : "1234 ",
      work_location : "1234 ",
      website_url : "1234 ",
      profile_image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDoisN_XW3IVsEn4qXXTiqfTFBCCQOWqDFg&usqp=CAU",
      creation_date : "1234 ",
      about_me : " 1234"
    });
  // const [account_id, set_account_id] = useState([]);
  const [myPost, setmyPost] = useState({
    password : "myData.password",
    name : "myData.name", 
    work_location : "myData.work_location",
    website_url :"myData.website_url",
    profile_image_url : "myData.profile_image_url",
    about_me : "myData.about_me"
  });

  useEffect(() => {
    const tempo=cookies.username;
    // console.log();
    if(tempo===undefined) navigate("/");
    else
    {
      axios.get("http://localhost:5000/profile/"+params.display_name)
      .then((response) => {
        console.log(response.data);
        setmyData(...response.data)
        setmyPost(...response.data)
    }
      )
    }
    
      // .catch((Error) => setError(Error.message));
  }, []);

  const handleSubmit = e => {
    e.preventDefault()

      axios.post("http://localhost:5000/profile/"+cookies.username, myPost)
      .then(response => {
        console.log(response)
        
      })
      window.location.reload(false);
  }

  function getText(html){
        var divContainer= document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }

    function rankings(rep){
      var out;
      if(rep <= 2000)  out = "Bronze";
      else if(rep > 2000 && rep <= 5000) out = "Silver";
      else if(rep > 5000 && rep <= 10000) out = "Gold";
      else out = "Platinum";
      return out;
    }
    
    return (
        <>
                <div className="container py-4">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="card">
                          <div className="card-body text-center">
                            <img src={myData.profile_image_url} className="rounded-circle img-fluid" alt="profile pic" />
                            <h4 className="my-3">{myData.display_name}</h4>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                              {/* <span className="material-symbols-rounded">thumb_up</span> */}
                              {/* <i className="far fa-thumbs-up"></i> */}
                                <p className="lead"><strong>rank</strong></p>
                                <p className="lead">{rankings(myData.reputation)}</p>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <p className="lead"><strong>reputation</strong></p>
                                <p className="lead">{myData.reputation}</p></li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <p className="lead"><strong>Upvotes</strong></p>
                                <p className="lead">{myData.up_votes}</p></li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <p className="lead"><strong>Downvotes</strong></p>
                                <p className="lead">{myData.down_votes}</p></li>
                              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <p className="lead"><strong>Views</strong></p>
                                <p className="lead">{myData.views}</p></li>
                            </ul>
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="card mb-5">
                            <div className="card-body text-center">
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Account_id</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Recipient's username" value={myData.account_id} readOnly/>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    
                                    {/* <button className="btn btn-outline-primary" type="button" id="button-addon2">Edit</button> */}
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Profession</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type="text" className="form-control" placeholder="aws" value={myData.name} onChange={e=>{
                                      setmyPost({...myPost,name:e.target.value});
                                      setmyData({...myData,name:e.target.value})
                                      }} readOnly={value.shift}/>
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Work-location</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type="text" className="form-control" placeholder="hyd" value={myData.work_location} onChange={e=>{
                                      setmyPost({...myPost,work_location:e.target.value});
                                      setmyData({...myData,work_location:e.target.value})
                                      }} readOnly={value.shift}/>
                                    {/* <button className="btn btn-outline-primary" type="button" id="button-addon2">Edit</button> */}
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Web_url</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type= "url" className="form-control" placeholder="asdf.com" value={myData.website_url} onChange={e=>{
                                      setmyPost({...myPost,website_url:e.target.value});
                                      setmyData({...myData,website_url:e.target.value})
                                      }} readOnly={value.shift}/>
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="row" hidden={value.shift}>
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Profile_image_url</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type= "url" className="form-control" placeholder="asdf.com" value={myData.profile_image_url} onChange={e=>{
                                      setmyPost({...myPost,profile_image_url:e.target.value});
                                      setmyData({...myData,profile_image_url:e.target.value})
                                      }} readOnly={value.shift}/>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-3">
                                  <p className="my-1"><strong>Creation_date</strong></p>
                                </div>
                                <div className="col-sm-9">
                                  <div className="input-group">
                                    <input type="text" className="form-control" placeholder="dd/mm/yy" value={myData.creation_date} readOnly/>
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className='row'>
                                <div className='col-sm-3'>
                                  <label htmlFor="Textarea" className="form-label"><p><strong>About me</strong></p></label>
                                </div>
                                <div className='col-sm-9'>
                                  <textarea className="form-control" id="Textarea" rows="5" value={getText(myData.about_me)} onChange={e=>{
                                      setmyPost({...myPost,about_me:e.target.value});
                                      setmyData({...myData,about_me:e.target.value})
                                      }} readOnly={value.shift}></textarea>
                                      {/* {myData.about_me} */}
                                </div>
                              </div>
                              
                              <hr></hr>
                              <div className='row'>
                                <div className='col-sm-4'>
                                  {/* <button onClick={edit_toggle} className="btn btn-outline-primary my-2" type="button" id="button-addon2" disabled={value.edit_btn} >Edit Here !!!</button> */}
                                </div>
                                <div className='col-sm-4'>
                                  {/* <button className="btn btn-outline-success my-2" type="button" id="button-addon2" disabled={value.save_btn} onClick={handleSubmit} onInput={e => setValue(e)}>Save Changes !!!</button> */}
                                </div>
                                <div className='col-sm-4'>
                                  <Link className="btn btn-outline-info my-2" type="button" id="button-addon2" to="/homepage">Return to home</Link>
                                </div>
                              </div> 
                            </div>
                      </div>   
                    </div>
                  </div>
                </div>     
        </>
    )
}