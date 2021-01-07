import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';

export default function ViewAllRequests() {
  const [requests, setrequest] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewAllRequests',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
        setrequest(res.data)

      });  });

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