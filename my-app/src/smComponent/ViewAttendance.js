import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function ViewAttendance() {
    const [attendance, setAttendance] = useState([])

    useEffect(() => {
      axios   
      .get('http://localhost:8000/viewAttendance', {headers:{'token':localStorage.getItem('token')}})
      .then(res => {
          setAttendance(res.data)
         
        });  });
  
      return (
  
      
          <div>   
              <h2>Attendance:</h2>
              <ul>
                  {attendance.map((item, i) => {
                  return <li key={i}>
               <ul> signIn: {item.signInTime} </ul>
                <ul> signOut: {item.signOutTime} </ul>
                  <br/>
                  
                  
                  </li>
  
                  })}
               </ul>
              </div>
  )
}
