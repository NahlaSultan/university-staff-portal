import React,{useRef, useState, useEffect} from 'react'
import {useHistory } from 'react-router-dom'

import axios from 'axios'
import '../styling/main.css';

export default function ViewAllRequests() {
  const [requests, setrequest] = useState([])
  let history = useHistory()

  useEffect(() => {
    // Update the document title using the browser API

    const checkToken = async()=>{
      if(localStorage.getItem('token')){
        console.log("TOKENS")
        await axios
        .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
        .then(res => {
        if(!res.data.includes('headOfdepartments')) {
          history.push('/error')
        } 
        });
      }
      else{
        console.log("NOT TOKENS")
        history.push('/')
  
      }

  }

  checkToken()

    axios   
    .get('http://localhost:8000/hod/viewAllRequests',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
        setrequest(res.data)

      });  },[]);

  return (

        <div>
          <h2><br></br> Requests: <br></br> <br></br> </h2>
          <ul className='viewStaff' >
             {requests.map((s,i) =>{
               return <li key={i}>{s} <br></br> <br></br></li>               
             })}
          </ul>
          
        </div>
    

  )

}