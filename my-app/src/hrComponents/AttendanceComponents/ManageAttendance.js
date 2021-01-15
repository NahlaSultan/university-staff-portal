import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';



export default function ManageAttendane() {
  const [staffs, setStaffs] = useState([])
  let history = useHistory()
  useEffect(() => {
    
    const checkToken = async()=>{
      if(localStorage.getItem('token')){
        console.log("TOKENS")
        await axios
        .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
        .then(res => {
        if(!res.data.includes('HR members')) {
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




  return (
    <>
      <div >
        <h1>Manage Staff Attendace</h1>
        <br />
        <ul><button className='btn' style={{ height: "40px" }}>
          <Link to='/hr/AddSignIn'>
            Add Sign In Record
            </Link>  </button> </ul>
        <br />

        <ul><button className='btn' style={{ height: "40px" }}>
          <Link to='/hr/AddSignOut'>
                         Add Sign Out Record 
          </Link>  </button> </ul>
        <br />

        <ul><button className='btn' style={{ height: "40px" }}>
          <Link to='/hr/viewAttendance'>
             View Attendance   
          </Link>  </button> </ul>
        <br />

        <ul><button className='btn' style={{ height: "40px" }}>
          <Link to='/hr/viewMissingHours'>
             View Staff Members with Missing Hours 
          </Link>  </button> </ul>
        <br />

        <ul><button className='btn' style={{ height: "40px" }}>
          <Link to='/hr/viewMissingDays'>
             View Staff Members with Missing Days 
          </Link>  </button> </ul>

      </div>



    </>


  )

}


