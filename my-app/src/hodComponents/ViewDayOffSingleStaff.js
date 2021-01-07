import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function ViewDayOffSingleStaff() {
  const [dayOff, setDayOff] = useState()
  const StaffIDRef=useRef()


     function HandleView(){
        const body={staffId: StaffIDRef.current.value }

        axios   
        .post('http://localhost:8000/hod/viewDayOffSingleStaff',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setDayOff(res.data)
          });
    }  


  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Day Off
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
            <button onClick={HandleView} className="buttons">
                View Day Off
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {dayOff}</ul>
        <br></br><br></br>
    </div>

</>

      
    

  )

}