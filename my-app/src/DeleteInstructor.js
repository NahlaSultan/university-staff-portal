import React,{useRef} from 'react'
import axios from 'axios'

export default function DeleteInstructor() {
  const CoursenameRef=useRef()
  const InstructoridRef=useRef()
  
  function HandleDelete(){
    const body={courseName:CoursenameRef.current.value, instructorId:InstructoridRef.current.value  }
  CoursenameRef.current.value=null
  InstructoridRef.current.value=null
   axios   
   .post('http://localhost:8000/hod/deleteInstructor', body)
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
     Course Name:
    <input ref={CoursenameRef} type="text"/>
    <br></br>
    Instructor id:
    <input ref={InstructoridRef} type="text"/>
    <br></br>
    <button onClick={HandleDelete}> delete instructor </button>
    </div>
  )
}

