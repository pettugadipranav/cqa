import React, { useState, useEffect } from 'react';
import axios from './axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import AutoComplete from "./autocompletetags";
function Tags() {
  const [name,setname]=useState("")
  const [tagger,settagger]=useState([{
    tag_id: 188,
    tag_name: '.net',
    tag_count: 1422
  },])
    const [tags,settags]=useState([])
    const enter_app=(e)=>{
      console.log("Hello")
        if(e.key==="Enter" && name!=="")
        {
            //true implies duplicate element is present
            // settags([...tags,name])
            settags([...tags,name])
            // console.log(temp)
            // settags(temp)
            setname("")
        }
    }
    const del_this_tag=(e)=>{
        var x=e.currentTarget.getAttribute("data-value");
        settags([...tags.filter((value) => value != x)])
    }
    const [myData, setMyData] = useState([]);
    useEffect(() => {
      axios.get("/tag") // passing the parameter here
          .then((res) => {
            console.log(res.data)
            setMyData(res.data)
            settagger(res.data[0]) // data which is in syntax but not the data in useState in line 11
          })
          .catch((error)=> console.log(error));
      }, [])
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
     
    <div className='container my-3'>
        <h1 className='ps-5'>Tags</h1>
      <div className='row'>
        <div className='col-md-6 mb-3'>
            {/* <div className="d-flex align-items-center w-75 form-search">
                <div className="input-group ps-5">
                  <input type="text" id="myInput" className="form-control" placeholder="Search Tag names" aria-label="Search" value={name} onKeyPress={e=>{enter_app(e)}} onChange={e => {setname(e.target.value)}}/>
                </div>
                <a href="#!" className="text-dark"><i className="fas fa-search ps-3"></i></a>
            </div> */}
        </div>
        <div className='col-md-6 text-end mb-3'>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-outline-info" disabled>Tag count</button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setMyData([...myData].sort((a, b) => a.tag_count - b.tag_count));
                }}><i className="fas fa-sort-amount-up"></i></button>
                <button type="button" className="btn btn-outline-info" onClick={()=>{
                  setMyData([...myData].sort((a, b) => b.tag_count - a.tag_count));
                }}><i className="fas fa-sort-amount-down"></i></button>
            </div>

        </div>
        <AutoComplete options = {tag_arr} />
      </div>
          {
            tags.map(e=>{
              return(
                <>
                <div className="d-inline-block">
                <div className="btn-group me-2" role="group" aria-label="Second group">
                  <button type="button" className="btn btn-dark"><i className="fas fa-tag"></i> {e}</button>
                  <button className="btn btn-dark" data-value={e} type="button" id="button-addon2" onClick={del_this_tag}><i className="fas fa-times"></i></button>
                </div>
                </div>
                </>
                )
            })
          }
      <div>
    <div className='row my-4'>
      {myData.map((post) => {
        const { tag_name, tag_count } = post;
        return    <div className='col-md-3 mx-6'>
        <div className="card hover-shadow mb-2">
          <div className="card-header">
            <button type="button" className="btn btn-dark" ><i className="fas fa-tag"></i> 
              {tag_name}
            </button>
          </div>
          <div className="card-body">
            <p className="card-text">I want to read the onClick event value properties. But when I click on it, I see something like this on the console</p>
          </div>
          <div className="card-footer text-muted text-end">
            {tag_count} Questions
          </div>
        </div>
        <br></br>
      </div>
      })}
    
</div>
    </div>
    </div>
    </>
  )
}

export default Tags