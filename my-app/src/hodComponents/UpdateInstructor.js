import React,{useRef} from 'react'
import axios from 'axios'
export default function UpdateInstructor() {
  const CoursenameRef=useRef()
  const OldInstructoridRef=useRef()
  const NewInstructoridRef=useRef()
  function HandleAssign(){
    const body={courseName:CoursenameRef.current.value, oldInstructorId:OldInstructoridRef.current.value,
      newInstructorId:NewInstructoridRef.current.value  }
  CoursenameRef.current.value=null
  OldInstructoridRef.current.value=null
  NewInstructoridRef.current.value=null


   axios   
   .post('http://localhost:8000/hod/updateInstructor', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
     Course Name:
    <input ref={CoursenameRef} type="text"/>
    <br></br>
    old Instructor id:
    <input ref={OldInstructoridRef} type="text"/>
    <br></br>
    new Instructor id:
    <input ref={NewInstructoridRef} type="text"/>
    <br></br>
    <button onClick={HandleAssign}> update instructor </button>
    </div>
  )
}

