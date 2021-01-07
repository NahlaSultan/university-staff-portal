import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function ViewCourseCoverage() {
  const [coverage, setCoverage] = useState()
  const CourseRef=useRef()


     function HandleView(){
        const body={courseName: CourseRef.current.value }

        axios   
        .post('http://localhost:8000/hod/viewCourseCoverage',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setCoverage(res.data)
          });
    }  


  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Course Coverage
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
                View Course Coverage
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {coverage}</ul>

        <br></br><br></br>
    </div>

</>

      
    

  )

}