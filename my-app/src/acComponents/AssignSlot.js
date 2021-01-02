import React,{useRef} from 'react'
import axios from 'axios'
export default function AssignSlot() {
    const IDRef=useRef()
    const CourseRef=useRef()
  function AssSlot(){
    const body={memberID:IDRef.current.value, courseName:CourseRef.current.value  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/updateAssignedCourse', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

  return (
    <div>
     Staff ID:
    <input ref={IDRef} type="text"/>
    <br></br>
    Slot ID:
    <input ref={CourseRef} type="text"/>
    <br></br>
    <button onClick={AssSlot}> Assign </button>
    </div>
  )
}

