import React,{useRef} from 'react'
import axios from 'axios'
export default function RemoveAssignedCourse() {
    const IDRef=useRef()
    const CourseRef=useRef()
  function removeCourse(){
    const body={memberID:IDRef.current.value, courseName:CourseRef.current.value  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/removeAssignedCourse', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

  return (
    <div>
     Staff ID:
    <input ref={IDRef} type="text"/>
    <br></br>
    Course Name:
    <input ref={CourseRef} type="text"/>
    <br></br>
    <button onClick={ removeCourse}> Remove </button>
    </div>
  )
}

