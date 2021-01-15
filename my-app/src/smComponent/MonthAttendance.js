import React, { useState, useRef, useEffect } from 'react'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'


export default function MonthAttendance({ attendance }) {
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

    // <div>   
    //     <ul>
    //         {attendance.map((item, i) => {
    //         return <li key={i}>
    //        <ul> signIn: {item.signInTime} </ul>
    //         <ul> signOut: {item.signOutTime} </ul>
    //         <br/>


    //         </li>

    //         })}
    //      </ul>
    // </div>      




  )
}