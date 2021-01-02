import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function ViewMissingDays() {
  const [days, setDays] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/viewMissingDays')
    .then(res => {
        setDays(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>Missing Days:</h2>
            <ul>
                {days.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}