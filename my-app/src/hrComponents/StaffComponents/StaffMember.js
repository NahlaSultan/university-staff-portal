import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import AttendanceRecord from '../AttendanceComponents/AttendanceRecord'
import { useHistory } from "react-router-dom";


export default function StaffMember({st}) {
    const [attendance, setAttendance] = useState([])
    const [toggle, setToggle] = useState(true)
    const SalaryRef=useRef()
    let history = useHistory();


// useEffect(() => {
//   document.getElementById("salaryInput").hidden=toggle2

// });

function HandleDeleteStaff(){
  const body={id:st.memberID}

      axios   
       .post('http://localhost:8000/hr/deleteStaffMember',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res => {
           console.log(res.data)}
           ).catch(error => {
               console.log(error)
             })
 
}

     function HandleViewAttendance(){

        if(toggle){
          setAttendance(st.attendance)
           }
           else{
               setAttendance([])
   
           }  
          setToggle(toggle => !toggle);


    
    }


    function HandleUpdateSalary(){

      history.push({
        pathname: '/hr/updateSalary',
        state: { memberID: st.memberID 
    }
       })

    }

    function HandleUpdateStaff(){
      history.push({
        pathname: '/hr/updateStaff',
        state: { memberID: st.memberID ,
          email:st.email,
          name: st.name,
          annualLeavesBalance:st.annualLeavesBalance,
          fac:st.faculty, dep:st.department,
          office: st.officeLocation,
          gender: st.gender,
          dayOff: st.dayOff
  
  }
       })
    }




  return (

    
    <div className='leftDiv'>   
  
                <h3> {st.name} </h3>
                <ul> id: {st.memberID} </ul>
                <ul> email: {st.email} </ul> 
                <ul> Day off : {st.dayOff} </ul> 
                <ul> annualLeavesBalance: {st.annualLeavesBalance} </ul>
                <ul> gender: {st.gender} </ul> 
                <ul> office : {st.officeLocation} </ul>
                <ul> salary : {st.salary}    <button className = 'btn' onClick={HandleUpdateSalary}> Update Salary  </button>
                <div>
					
					</div>  </ul>
          <button className = 'btn' onClick={HandleViewAttendance}>   View attendance  </button>
                <ul> <AttendanceRecord attendance={attendance} /> </ul>
                <br/>

          <button className = 'btn' onClick={HandleDeleteStaff}>   Delete Member  </button> 
          <button className = 'btn' onClick={HandleUpdateStaff}>   Update Member  </button>  

          <br/>
          <br/>


        </div>      


    

  )

}


