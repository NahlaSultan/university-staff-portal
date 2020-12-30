import React,{useRef} from 'react'
import axios from 'axios'
export default function AssignCourse() {
    const IDRef=useRef()
    const SlotRef=useRef()
  function AssCourse(){
    const body={memberID:IDRef.current.value, numberID:SlotRef.current.value  }
  

   axios   
   .post('http://localhost:8000/ci/assignSlots', body)
   
   .then(res=>console.log(res.data));
  
}

  return (
    <div>
     Staff ID:
    <input ref={IDRef} type="text"/>
    <br></br>
    Slot ID:
    <input ref={SlotRef} type="text"/>
    <br></br>
    <button onClick={AssCourse}> Assign </button>
    </div>
  )
}

