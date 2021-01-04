import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
import AttendanceRecord from './AttendanceRecord'


export default function StaffMember({name, memberID, email, dayOff,annualLeavesBalance,gender, office }) {
    const [attendance, setAttendance] = useState([])
    const [toggle, setToggle] = useState(true)

    const body={id:memberID}

     function HandleViewAttendance(){
        if(toggle){
            axios   
           .post('http://localhost:8000/hr/viewAttendance',body, { headers: { 'token': localStorage.getItem('token') } })
           .then(res => {
               setAttendance(res.data)
               console.log(attendance)}
               ).catch(error => {
                   console.log(error)
                 })
           }
           else{
               setAttendance([])
   
           }  
        setToggle(toggle => !toggle);


    
    }




  return (

    
    <div className='leftDiv'>   
  
                <h3> {name} </h3>
                <ul> id: {memberID} </ul>
                <ul> email: {email} </ul> 
                <ul> Day off : {dayOff} </ul> 
                <ul> annualLeavesBalance: {annualLeavesBalance} </ul>
                <ul> gender: {gender} </ul> 
                <ul> office : {office} </ul>
                <button className = 'btn' onClick={HandleViewAttendance}>   View attendance  </button> 
                <ul> <AttendanceRecord attendance={attendance} /> </ul>
                <br/>

        </div>      


    

  )

}


