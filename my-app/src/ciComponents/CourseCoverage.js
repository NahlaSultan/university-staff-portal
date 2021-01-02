import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function CourseCoverage() {
  const [coverage, setCoverage] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/ci/viewCoverage')
    .then(res => {
        setCoverage(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>Course/s Coverage:</h2>
            <ul>
                {coverage.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}