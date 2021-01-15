import React from 'react'
import '../../styling/main.css';



export default function AttendanceRecord({ attendance }) {



  return (
    <table className="table">
    <tr className="th">
    <th>Sign In Time</th>
    <th>Sign Out Time </th>
 
    </tr>


    {attendance.map((item, i) => {
          return <tr key={i}>
            <td> {item.signInTime} </td>
            <td> {item.signOutTime} </td>

            <br />
          </tr>
        })}

</table>


  )

}


