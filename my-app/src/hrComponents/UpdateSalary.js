import React from 'react'
import { useLocation } from "react-router-dom";
import {useRef} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

function UpdateSalary() {
    const SalaryRef=useRef()
    const locationReact = useLocation();
    let history = useHistory();

    function HandleUpdateSalary(){
        const body={id:locationReact.state.memberID, salary: SalaryRef.current.value}
  
          axios   
         .post('http://localhost:8000/hr/updateSalary',body, { headers: { 'token': localStorage.getItem('token') } })
         .then(res => {
             console.log(res.data)
         
         })

         history.push('/hr/staffs')
  
  
      }
    
    return (
    <div className='leftDiv'>   
  
        <h3> {locationReact.state.name} </h3>
        <ul>  {locationReact.state.memberID} </ul>

        <ul> Salary : {locationReact.state.salary}  </ul>
        <div>
          <input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="New Salary" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
          </span>
        </div>
        <button className = 'btn' onClick={HandleUpdateSalary}> Update Salary  </button>    
    </div>
    )
}

export default UpdateSalary
