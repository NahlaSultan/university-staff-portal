import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'
export default function ViewDepartmentStaff() {
  const [staff, setStaff] = useState([])


  let history = useHistory()
  useEffect(() => {
      const checkToken = async()=>{
          if(localStorage.getItem('token')){
            console.log("TOKENS")
            await axios
            .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
            .then(res => {
            if(!res.data.includes('courseInstructors')) {
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
  },[]);

  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get('http://localhost:8000/ci/viewDepartmentStaff', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setStaff(res.data)
        // console.log("here")
        // console.log(res.data)
      });
  });

  return (


    <div>
      <h2>Department Staff:</h2>
      <ul>
        {staff.map((item, i) => {
          return <li key={i}>
            <ul> Name: {item.name} </ul>
            <ul> Email: {item.email} </ul>
            <ul> Role: {item.role} </ul>
            <ul> Courses: {item.course} </ul>
            <ul> Faculty: {item.faculty} </ul>
            <ul> Department: {item.department} </ul>
            <ul> office: {item.officeLocation} </ul>
            <br />


          </li>

        })}
      </ul>
    </div>




  )

}