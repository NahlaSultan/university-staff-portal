import React,{useRef, useState} from 'react'
import axios from 'axios'
export default function AcceptChangeDayoff() {
  const StaffIDRef=useRef()
  const [resp, setRes] = useState()

  function HandleAccept(){
    const body={staffId:StaffIDRef.current.value}


   axios   
   .post('http://localhost:8000/hod/acceptChangeDayOffRequest', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}

   return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                Accept Change Day off Request
  </span>


            <div>
                <input required={true} ref={StaffIDRef} className="input100" name="staffID" placeholder="Staff ID" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleAccept} className="buttons">
                Accept Request
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

