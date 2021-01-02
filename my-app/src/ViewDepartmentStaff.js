import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import './main.css';
export default function ViewDepartmentStaff() {
  const [staff, setStaff] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/ci/viewDepartmentStaff')
    .then(res => {
        setStaff(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>Department Staff:</h2>
            <ul>
                {staff.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}