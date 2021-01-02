import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import './main.css';
export default function ViewCourseStaff() {
  const [staff, setStaff] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/ci/viewCourseStaff')
    .then(res => {
        setStaff(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>Staff who gives same courses:</h2>
            <ul>
                {staff.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}