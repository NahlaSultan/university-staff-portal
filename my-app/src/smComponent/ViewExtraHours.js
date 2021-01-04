import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function ViewExtraHours() {
  const [hours, setHours] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/viewExtraHours',{headers:{'token':localStorage.getItem('token')}})
    .then(res => {
        setHours(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>Extra Hours:</h2>
            <ul>
                {hours.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}