import React,{useRef} from 'react'
import axios from 'axios'

export default function RejectChangeDayOff() {
    const StaffIDRef=useRef()
    const CommentRef=useRef()

  function HandleReject(){
    const body={staffId:StaffIDRef.current.value, comment:CommentRef.current.value}
    StaffIDRef.current.value=null
    CommentRef.current.value=null

   axios   
   .post('http://localhost:8000/ci/rejectChangeDayOffRequest', body)
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
    <br></br>
     Staff ID:
    <input ref={StaffIDRef} type="text"/>
    <br></br>
    Comment:
    <input ref={CommentRef} type="text"/>
    <br></br>
    <button onClick={HandleReject}> Reject change dayoff request </button>
    </div>
  )
}

