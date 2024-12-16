import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Add_question from './components/Add_question';
import Quest_ans from './components/Quest_ans';
import Sin_questans from './components/Sin_questans';
import Navbar from './components/Navbar';
import Show_Prof from './components/Show_prof';
function App() {
  
  return (
      <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/homepage" element={<Navbar/>}/>
      <Route path="/homepage/add_quest" element={<Add_question/>}/>
      <Route path="/homepage/profile" element={<Profile/>}/>
      <Route path="/homepage/quest" element={<Quest_ans/>}/>
      <Route path="/homepage/show_prof/:display_name" element={<Show_Prof/>}/>
      {/* <Route path="/homepage/temp" element={<Sin_questans/>}/> */}
      {/* These comments show how to routing using params dont delete them*/}
      {/* <Route path="/student" element={<Studentdash/>}/> */}
      {/* <Route path="/student/subtopic/:topicid/:subtopicid/:subtopicname" element={<Topic/>}/> */}
      {/* <Route path="/student/subtopic/:topicid/:subtopicid/:subtopicname" element={<Topic/>}/> */}
      {/* <Route path="/faculty" element={<Facultydash/>}/> */}
      {/* <Route path="/faculty/mycourses/:topicid/:subtopicid/:subtopicname" element={<Mycourse/>}/> */}
      {/* <Route path="/admin" element={<Admindash />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
