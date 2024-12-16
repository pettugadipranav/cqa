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
import Navbar from './Navbar';
import Top_questions from './Top_questions';
import My_Answers from './My_Answers';
import My_questions from './My_questions';
import Tags from './Tags';
import Users from './Users';

export default function Homepage(){
const navigate = useNavigate();
const [cookies, setCookie] = useCookies(['name']);
const [user,setuser]=useState("")
const [element,setelement]=useState(<Top_questions/>)
    useEffect(()=>{
        setuser(()=>{
            const tempo=cookies.username;
            console.log(tempo);
            if(tempo===undefined) navigate("/");
            return tempo;
        })
},[])
return(
    <>
    <Navbar/>
    <Link onClick={()=>{setelement(<Top_questions/>)}}>Top questions</Link>
    <br/>
    <Link onClick={()=>{setelement(<My_questions/>)}}>My Questions</Link>
    <br/>
    <Link onClick={()=>{setelement(<My_Answers/>)}}>My_Answers</Link>
    <br/>
    <Link onClick={()=>{setelement(<Tags/>)}}>Tags</Link>
    <br/>
    <Link onClick={()=>{setelement(<Users/>)}}>Users</Link>
    <br/>
    <br/>
    {element}
</>
);

}

