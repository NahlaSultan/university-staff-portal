import React,{useRef, useState, useEffect} from 'react'
import {useHistory } from 'react-router-dom'

import axios from 'axios'
import '../styling/main.css';


export default function ViewAllStaff() {
  const [staff, setStaff] = useState([])
  let history = useHistory()

  useEffect(() => {
    // Update the document title using the browser API

    const checkToken = async()=>{
      if(localStorage.getItem('token')){
        console.log("TOKENS")
        await axios
        .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
        .then(res => {
        if(!res.data.includes('headOfdepartments')) {
          history.push('/error')
        } 
        });
      }
      else{
        console.log("NOT TOKENS")
        history.push('/')
  
      }

  }

  checkToken()

    axios   
    .get('http://localhost:8000/hod/viewAllStaff',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
      setStaff(res.data)

      });  },[]);


  return (

        <div>
          <h2><br></br></h2>
          <ul className="assignCourse" >
             {staff.map((st,i) =>{
               return <li key={i}>
                 <h1>
                   Staff ID: {st.memberID}
                 </h1>
                 <h3>
                   Name: {st.name}<br></br>
                   Email: {st.email}<br></br>
                   Role: {st.role}<br></br>
                   Day Off: {st.dayOff}<br></br>
                   Office Locaion: {st.officeLocation}<br></br>
                   Annual leaves balance: {st.annualLeavesBalance}<br></br>
                   Leaves: 
                   {st.leaves}
                    {/* {(st.leaves).map((l,j) =>{
                     <h4 key={j}>{l}<br></br></h4>
                   })} */}
                   <br></br>
                   Request replacement sent: {st.requestReplacementSent}<br></br>
                   Request replacement received: {st.requestReplacmentReceived}<br></br>
                   Courses: {st.course}<br></br>
                   Slots assigned: {st.slotsAssigned}<br></br>
                   Slots replaced: {st.slotsReplaced}<br></br>
                   Slots to replace: {st.slotsToReplace}<br></br>
                   Day off request sent: {st.dayOffRequestSent}<br></br>
                 </h3>
                 <br></br><br></br>
                 
                 <br></br> <br></br></li>               
             })}
          </ul>
          
        </div>
    

  )

}