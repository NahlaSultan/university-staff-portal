import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';
import TeachingAssignments from './TeachingAssignments'

export default function ViewTeachingAssignments() {
  const [teachAss, setTeachAss] = useState([])
  const CourseRef=useRef()


     function HandleView(){
        const body={courseName: CourseRef.current.value }

        axios   
        .post('http://localhost:8000/hod/viewTeachingAssignments',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setTeachAss(res.data)
          });
    }  


  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Teaching Assignments
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
                View Teaching Assignments
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> <TeachingAssignments teachAss={teachAss} /></ul>

        <br></br><br></br>
    </div>

</>

      
    

  )

}