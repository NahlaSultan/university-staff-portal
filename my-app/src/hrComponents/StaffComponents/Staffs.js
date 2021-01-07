import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import StaffMember from './StaffMember';



export default function Staffs() {
  const [hr,setHr]= useState([])
  const [ac,setAC] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hr/viewHR',{ headers: { 'token': localStorage.getItem('token') } })
    .then(res => {
        setHr(res.data)
    },[]);

    axios   
    .get('http://localhost:8000/hr/viewAC',{ headers: { 'token': localStorage.getItem('token') } })
    .then(res => {
        setAC(res.data)
    },[]);
  })


  return (

    
        <div >   
            <h2>GUC Academic Members:</h2>
            <ul >
                {ac.map((st, i) => {
                return <li key={st._id}>
                <StaffMember st={st} />
                </li>
                })}
             </ul>
             <h2>GUC HR Members:</h2>

             <ul >
                {hr.map((st, i) => {
                return <li key={st._id}>
                <StaffMember st={st} />
                </li>
                })}
             </ul>
        </div>      


    

  )

}


