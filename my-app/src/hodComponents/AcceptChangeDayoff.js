import React,{useRef} from 'react'
import axios from 'axios'

export default function AcceptChangeDayOff() {
    const StaffIDRef=useRef()
    const 

  function HandleAccept(){
    const body={requestId:StaffIDRef.current.value}
    StaffIDRef.current.value=null

   axios   
   .post('http://localhost:8000/hod/acceptChangeDayOffRequest', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
}

  return (
    <div>
     Staff ID:
    <input ref={StaffIDRef} type="text"/>
    <br></br>
    <button onClick={HandleAccept}> Accept change dayoff request </button>
    </div>
  )
}

