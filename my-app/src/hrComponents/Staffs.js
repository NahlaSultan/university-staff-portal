import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
import StaffMember from './StaffMember';



export default function Staffs() {
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hr/viewStaffs',{ headers: { 'token': localStorage.getItem('token') } })
    .then(res => {
        setStaffs(res.data)
      });  });




  return (

    
        <div >   
            <h2>GUC Staff Members:</h2>
            <ul >
                {staffs.map((st, i) => {
                return <li key={st._id}>
                <StaffMember st={st} />
                </li>
                })}
             </ul>
        </div>      


    

  )

}


