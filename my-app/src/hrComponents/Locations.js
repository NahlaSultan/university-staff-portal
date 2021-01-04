import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';



export default function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hr/viewLocations',{ headers: { 'token': localStorage.getItem('token') } })
    .then(res => {
        setLocations(res.data)
      });  });




  return (

    
        <div>   
            <h2>Array of Locations:</h2>
            <ul>
                {locations.map((loc, i) => {
                return <li key={loc._id}>
                <h3> {loc.name} </h3>
                <ul> type: {loc.type} </ul>
                <ul> capacity: {loc.capacity} </ul> 
                <ul> office Members: {loc.officeMembers} </ul> 
                <br/>
                </li>
                })}
             </ul>
        </div>      


    

  )

}

