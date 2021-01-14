import React, { useRef, useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation, useHistory } from "react-router-dom";


export default function AddCourse() {

  const CourseNameRef = useRef()
  const SlotNoRef = useRef()
  const locationReact = useLocation();
  const [res, setRes] = useState("")
  let history = useHistory()
  const facultyName = locationReact.state.facultyName
  const departmentName = locationReact.state.departmentName


  function HandleAddCourse() {

    if(!CourseNameRef.current.value || CourseNameRef.current.value==""){
      setRes("must sepcify course name")
      return
    }

    const body = {
      facultyName: facultyName,
      departmentName: departmentName,
      courseName: CourseNameRef.current.value,
      teachingSlotsNumber: SlotNoRef.current.value
    }

    axios
      .post('http://localhost:8000/hr/addCourse', body, { headers: { 'token': localStorage.getItem('token') } })

      .then(res => {
        if (res.data == "success") {
          history.push({
            pathname: '/hr/departmentsPage',
            state: { facultyName: facultyName }
         }) }
        setRes(res.data)
        });

    

  }

  return (
    <>
        <div className="addStaff">


          <span className="login100-form-title">
            Add Course
					</span>

        

  

          <div>
            <input required={true} ref={CourseNameRef} className="input100" id="coursenameInput" placeholder="Course Name" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br />
          </div>

          <div>
            <input required={true} ref={SlotNoRef} type='number' className="input100" id="slotNoInput" placeholder="Number of Teaching Slots" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br />
          </div>



          <div className="container-login100-form-btn">
            <button onClick={HandleAddCourse} className="login100-form-btn">
              Add Course
			  </button>
          </div>

          <div class="alert">
            {res}
            </div>



        </div>

    </>

  )
}

