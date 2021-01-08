import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';
import StaffinCourse from './StaffinCourse'


export default function ViewStaffinCourse() {
  const [staff, setStaff] = useState([])
  const CourseRef=useRef()


     function HandleView(){
        const body={courseName: CourseRef.current.value }

      axios   
        .post('http://localhost:8000/hod/viewStaffinCourse',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
          setStaff(res.data)
          });
    }  


  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Staff in Course
  </span>


            <div>
                <input required={true} ref={CourseRef} className="input100" name="courseName" placeholder="Course Name" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleView} className="buttons">
                View Staff
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> <StaffinCourse staff={staff} /></ul>

        <br></br><br></br>
    </div>

</>

      
    

  )

}