import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
import AttendanceRecord from './AttendanceRecord'


export default function StaffMemberAttendance({name, memberID, email, dayOff,annualLeavesBalance,gender, office,salary }) {
    const [attendance, setAttendance] = useState([])
    const [toggle, setToggle] = useState(true)
    const [toggle2, setToggle2] = useState(true)
    const SalaryRef=useRef()

// useEffect(() => {
//   document.getElementById("salaryInput").hidden=toggle2

// });

function HandleSignIn(){
    
 
}

function HandleViewAttendance(){
      const body={id:memberID}

        if(toggle){
            axios   
           .post('http://localhost:8000/hr/viewAttendance',body, { headers: { 'token': localStorage.getItem('token') } })
           .then(res => {
               setAttendance(res.data)
               console.log(attendance)}
               ).catch(error => {
                   console.log(error)
                 })
           }
           else{
               setAttendance([])
   
           }  
        setToggle(toggle => !toggle);


    
    }
    function HandleUpdateSalary(){

      const body={id:memberID, salary: SalaryRef.current.value}

      if(toggle2){

        axios   
       .post('http://localhost:8000/hr/updateSalary',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res => {
           console.log(res.data)
       
       })

       document.getElementById("salaryInput").value=''

      }

       else{
           
      //  document.getElementById("salaryInput").hidden=true

       }  

       //setToggle2(toggle2 => !toggle2);



    }




  return (

    
    <div className='leftDiv'>   
  
                <h3> {name} </h3>
                <ul> id: {memberID} </ul>
                <ul> email: {email} </ul> 
                <ul> Day off : {dayOff} </ul> 
                <ul> annualLeavesBalance: {annualLeavesBalance} </ul>
                <ul> gender: {gender} </ul> 
                <ul> office : {office} </ul>
                <ul> salary : {salary}    <button className = 'btn' onClick={HandleUpdateSalary}> Update Salary  </button>
                <div>
						<input required={true} ref={SalaryRef} className="input100" id="salaryInput" type='number' placeholder="Salary" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
						</span>
                        <br/>
					</div>  </ul>
          <button className = 'btn' onClick={HandleDeleteStaff}>   Delete Member  </button>  
                <button className = 'btn' onClick={HandleViewAttendance}>   View attendance  </button>
                <ul> <AttendanceRecord attendance={attendance} /> </ul>
                <br/>

        </div>      


    

  )

}


