import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
import { useHistory } from 'react-router-dom';
export default function ViewProfile() {
    const [staff, setStaff] = useState([])
    const [role, setRole] = useState([])

    let history = useHistory()
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      console.log("TOKENS")
    }
    else{
      console.log("NOT TOKENS")
      history.push('/')

    }
    axios   
    .get('http://localhost:8000/viewProfile', {headers:{'token':localStorage.getItem('token')}})
    .then(res => {
        setStaff(res.data)
       
      });  },[]);

    return (

    
        <div>   
            <h2>My Profile:</h2>
            <ul>
                {staff.map((item, i) => {
                return <li key={i}>
                <ul> Name: {item.name} </ul>
                <ul> Email: {item.email} </ul> 
                <ul> Member ID: {item.memberID} </ul>
                <ul> Role: {item.role} </ul> 
                <ul> Courses: {item.course} </ul> 
                <ul> Faculty: {item.faculty} </ul> 
                <ul> Department: {item.department} </ul> 
                <ul> Office: {item.officeLocation} </ul> 
                <ul> Salary: {item.salary} </ul> 
                <ul> Salary this month: {item.monthSalary} </ul> 

                <br/>
                
                
                </li>

                })}
             </ul>
            </div>
)
}
