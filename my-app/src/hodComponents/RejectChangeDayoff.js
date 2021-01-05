import React,{useRef} from 'react'
import axios from 'axios'

export default function RejectChangeDayOff() {
    const StaffIDRef=useRef()
    const CommentRef=useRef()

  function HandleReject(){
    const body={requestId:StaffIDRef.current.value, comment:CommentRef.current.value}
    StaffIDRef.current.value=null
    CommentRef.current.value=null

   axios   
   .post('http://localhost:8000/hod/rejectChangeDayOffRequest', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
     Staff ID:
    <input ref={StaffIDRef} type="text"/>
    <br></br>
    Comment:
    <input ref={CommentRef} type="text"/>
    <br></br>
    <button onClick={HandleReject}> Reject Leave request </button>
    </div>
  )
}

