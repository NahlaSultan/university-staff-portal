import React,{useRef, useState} from 'react'
import axios from 'axios'
export default function AssignInstructor() {
  const CoursenameRef=useRef()
  const InstructoridRef=useRef()
  const [resp, setRes] = useState()

  function HandleAssign(){
    const body={courseName:CoursenameRef.current.value, instructorId:InstructoridRef.current.value  }

  // CoursenameRef.current.value=null
  // InstructoridRef.current.value=null

   axios   
   .post('http://localhost:8000/hod/assignInstructor', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}

   return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                Assign Instructor
  </span>


            <div>
                <input required={true} ref={CoursenameRef} className="input100" name="courseName" placeholder="Course Name" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

            <div>
                <input required={true} ref={InstructoridRef} className="input100" name="instructorID" placeholder="Instructor ID" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleAssign} className="buttons">
                Assign Instructor
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

