import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';



export default function ManageAttendane() {
  const [staffs, setStaffs] = useState([])

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   axios
  //     .get('http://localhost:8000/hr/viewStaffs', { headers: { 'token': localStorage.getItem('token') } })
  //     .then(res => {
  //       setStaffs(res.data)
  //     });
  // }, []);




  return (
    <>
      <div >
        <h1>Manage Attendace:</h1>
        <ul><button className='btn' >
          <Link to='/hr/AddSignIn'>
            SignIn
            </Link>  </button> </ul>

        <ul><button className='btn' >
          <Link to='/hr/AddSignOut'>
            <li > SignOut  </li>
          </Link>  </button> </ul>

        <ul><button className='btn' >
          <Link to='/hr/viewAttendance'>
            <li > View Attendace  </li>
          </Link>  </button> </ul>

      </div>

      <div >
        <h2>GUC Staff Members:</h2>
        <ul >
          {staffs.map((st, i) => {
            return <li key={st._id}>
              <h4>   {st.memberID}</h4>
              <li>{st.name}</li>
            </li>
          })}
          <br /><br />
        </ul>

      </div>

    </>


  )

}


