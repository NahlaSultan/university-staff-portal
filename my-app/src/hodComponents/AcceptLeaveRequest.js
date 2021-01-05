import React,{useRef} from 'react'
import axios from 'axios'

export default function AcceptLeaveRequest() {
    const RequestIDRef=useRef()

  function HandleAccept(){
    const body={requestId:RequestIDRef.current.value}
    RequestIDRef.current.value=null

   axios   
   .post('http://localhost:8000/hod/acceptLeaveRequest', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
     Request ID:
    <input ref={RequestIDRef} type="text"/>
    <br></br>
    <button onClick={HandleAccept}> Accept Leave request </button>
    </div>
  )
}

