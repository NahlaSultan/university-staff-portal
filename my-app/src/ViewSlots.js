import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import './main.css';
export default function ViewSlots() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/ci/viewSlots')
    .then(res => {
        setSlots(res.data)
        console.log("here")
        console.log(res.data)
      });  });

  return (

    
        <div>   
            <h2>My Slots:</h2>
            <ul>
                {slots.map((item, i) => {
                return <li key={i}>{item}</li>
                })}
             </ul>
        </div>      


    

  )

}