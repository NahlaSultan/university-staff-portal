import React from 'react'
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom'
import {useRef} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import '../../styling/main.css';


function UpdateSalary() {
    const SalaryRef=useRef()
    const MonthSalaryRef=useRef()

    const locationReact = useLocation();
    let history = useHistory();

    function HandleUpdateSalary(){
        const body={id:locationReact.state.memberID, salary: SalaryRef.current.value, monthSalary: MonthSalaryRef.current.value}
  
          axios   
         .post('http://localhost:8000/hr/updateSalary',body, { headers: { 'token': localStorage.getItem('token') } })
         .then(res => {
             console.log(res.data)
         
         })

         history.push('/hr/staffs')
  
  
      }
    
    return (
    <div className='leftDiv'>   
    			        <Link to='/hr/staffs' className="linkPrev">&laquo;</ Link> <br/>

  
        <h3> {locationReact.state.name} </h3>
        <ul>  {locationReact.state.memberID} </ul>

        <ul> Salary : {locationReact.state.salary}  </ul>
        <div>
          <input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
          </span>
        </div>

        <ul> This month's Salary : {locationReact.state.monthSalary}  </ul>
        <div>
          <input required={true} ref={MonthSalaryRef} className="input100" id="salaryInput" type='number' placeholder="New Salary for this month only" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
          </span>
        </div>
        <button className = 'btn' onClick={HandleUpdateSalary}> Update Salary  </button>    
    </div>
    )
}

export default UpdateSalary
