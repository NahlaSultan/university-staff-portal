import React from 'react'
import '../../styling/main.css';



export default function AttendanceRecord({ attendance }) {



  return (

    <div>
      <ul >
        {attendance.map((item, i) => {
          return <li key={i}>
            <ul> signIn: {item.signInTime} </ul>
            <ul> signOut: {item.signOutTime} </ul>

            <br />
          </li>
        })}
      </ul>
    </div>

  )

}


