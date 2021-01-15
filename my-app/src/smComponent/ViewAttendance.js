import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/tables.css';
import { Link, useHistory } from 'react-router-dom'
export default function ViewAttendance() {
  const [attendance, setAttendance] = useState([])


  let history = useHistory()

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('token')) {
        console.log("TOKENS")

      }
      else {
        console.log("NOT TOKENS")
        history.push('/')

      }

    }
    checkToken()
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/viewAttendance', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setAttendance(res.data)

      });
  });

  return (
    <div>
      <h2>Attendance:</h2>
      <br></br>
      <br></br>
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
    </div>

    // <div>   
    //     <h2>Attendance:</h2>
    //     <ul>
    //         {attendance.map((item, i) => {
    //         return <li key={i}>
    //      <ul> signIn: {item.signInTime} </ul>
    //       <ul> signOut: {item.signOutTime} </ul>
    //         <br/>


    //         </li>

    //         })}
    //      </ul>
    //     </div>
  )
}
