import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';

export default function ViewDayOffAllStaff() {
  const [staff, setStaff] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewDayOffAllStaff',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
      setStaff(res.data)

      });  });

  return (

        <div>
          <ul className="assignCourse" >
             {staff.map((s,i) =>{
               return <li key={i}>
                 <br></br>
                 <h2>{s[0]}</h2>
                 <h4>{s[1]}<br></br>
                 {s[2]}<br></br>
                 </h4>
                   <br></br>
               </li>               
             })}
          </ul>
          
        </div>
    

  )

}