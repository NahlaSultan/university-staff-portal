import React,{useRef} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation } from "react-router-dom";


export default function AddCourse() {
  // const FacNameRef=useRef()
  // const DepNameRef=useRef()
  const CourseNameRef=useRef()
  const SlotNoRef=useRef()
  const locationReact = useLocation();

  const facultyName = locationReact.state.facultyName
  const departmentName = locationReact.state.departmentName

  function ClearTxtfields(){
    // document.getElementById('depnameInput').value = ''
    // document.getElementById('facnameInput').value = ''
    document.getElementById('coursenameInput').value = ''
    document.getElementById('slotNoInput').value = ''

  }

  function HandleAddCourse(){

    const body={
        facultyName:facultyName,
        departmentName: departmentName,
        courseName:  CourseNameRef.current.value,
        teachingSlotsNumber:  SlotNoRef.current.value             
     }

   axios   
   .post('http://localhost:8000/hr/addCourse', body, { headers: { 'token': localStorage.getItem('token') } })
   
   .then(res=>console.log(res.data));
   ClearTxtfields()
}

  return (
    <>
    <form> 
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Course
					</span>



            {/* <div>
              <input required={true} ref={FacNameRef} className="input100" id="facnameInput" placeholder="Faculty Name" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
              </span>
              <br/>
					  </div>

          <div>
            <input required={true} ref={DepNameRef} className="input100" id="depnameInput" placeholder="Department Name" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br/>
					</div> */}

          <div>
            <input required={true} ref={CourseNameRef} className="input100" id="coursenameInput" placeholder="Course Name" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br/>
		    </div>
        
            <div>
            <input required={true} ref={SlotNoRef} type='number' className="input100" id="slotNoInput" placeholder="Number of Teaching Slots" />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
            </span>
            <br/>
					</div>

            

			<div className="container-login100-form-btn">
              <button onClick={HandleAddCourse} className="login100-form-btn">
				Add Course
			  </button>
			</div>

	


	</div>
    </form>
	
</>

  )
}

