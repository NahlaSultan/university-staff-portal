import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
import MonthAttendance from './MonthAttendance'

export default function ViewMonthAttendance() {
  const [attendance, setAttendance] = useState([])
  const monthRef=useRef()
  function HandleViewMonthAttendance(){
    const body={month:monthRef.current.value}
 
    axios   
    .post('http://localhost:8000/ci/viewCourseStaff',body,{headers:{'token':localStorage.getItem('token')}})
    .then(res => {
        setAttendance(res.data)
        console.log("here")
        console.log(res.data)
      });  
     
    }
    return (
      <>
          <div >
              <div className="viewMonthAttendance">
  
  
                  <span className="login100-form-title">
                      View Course Staff
        </span>
        <br></br>
              <br></br>
  
  
                  <div>
                      <input required={true} ref={monthRef} className="input100" name="Month" placeholder="specify a month" />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                      </span>
                      <br />
                  </div>
  

              </div>
             
              <br></br>
              <br></br>
              <div className="buttons">
                  <button onClick={ HandleViewMonthAttendance} className="buttons">
                      View Attendance
          </button>
          <br></br>
          <ul> <MonthAttendance attendance={attendance} /> </ul>
              </div>
  
          </div>
  
      </>
  )

  

}