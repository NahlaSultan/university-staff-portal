import React,{useRef, useState} from 'react'
import axios from 'axios'
export default function UpdateInstructor() {

  const CoursenameRef=useRef()
  const OldInstructoridRef=useRef()
  const NewInstructoridRef=useRef()
  const [resp, setRes] = useState()

  function HandleUpdate(){
    const body={courseName:CoursenameRef.current.value, oldInstructorId:OldInstructoridRef.current.value
      , newInstructorId:NewInstructoridRef.current.value}

   axios   
   .post('http://localhost:8000/hod/updateInstructor', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}

   return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
            Update Instructor
  </span>


            <div>
                <input required={true} ref={CoursenameRef} className="input100" name="courseName" placeholder="Course Name" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

            <div>
                <input required={true} ref={OldInstructoridRef} className="input100" name="instructorID" placeholder="Old Instructor ID" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

            <div>
                <input required={true} ref={NewInstructoridRef} className="input100" name="instructorID" placeholder="New Instructor ID" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleUpdate} className="buttons">
            Update Instructor
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {resp} </ul>
        <br></br><br></br>
    </div>

</>

      
    

  )
}

