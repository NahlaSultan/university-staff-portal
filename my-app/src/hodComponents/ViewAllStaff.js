import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
// import AttendanceRecord from '../../hodComponents/AttendanceComponents/AttendanceRecord'


export default function ViewAllStaff() {
  const [staff, setStaff] = useState([])
  // const [attendance, setAttendance] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewAllStaff',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
      setStaff(res.data)

      });  });

    //   function HandleViewAttendance(){

    //     if(toggle){
    //       setAttendance(st.attendance)
    //        }
    //        else{
    //            setAttendance([])
   
    //        }  
    //       setToggle(toggle => !toggle);


    
    // }

  return (

        <div>
          <h2><br></br></h2>
          <ul className='viewStaff' >
             {staff.map((s,i) =>{
               return <li key={i}>
                 <h1>
                   Staff ID: {s.memberID}
                 </h1>
                 <h3>
                   Name: {s.name}<br></br>
                   Email: {s.email}<br></br>
                   Role: {s.role}<br></br>
                   Day Off: {s.dayOff}<br></br>
                   Office Locaion: {s.officeLocation}<br></br>
                   {/* <button className = 'btn' onClick={HandleViewAttendance}>   View attendance  </button> */}
                {/* <ul> <AttendanceRecord attendance={attendance} /> </ul>
                   Attendance: {s.attendance}<br></br> */}
                   Annual leaves balance: {s.annualLeavesBalance}<br></br>
                   Leaves: {s.leaves}<br></br>
                   Request replacement sent: {s.requestReplacementSent}<br></br>
                   Request replacement received: {s.requestReplacmentReceived}<br></br>
                   Coordinator linking requests: {s.coordinatorLinkingRequests}<br></br>
                   Courses: {s.course}<br></br>
                   Slots assigned: {s.slotsAssigned}<br></br>
                   Slots replaced: {s.slotsReplaced}<br></br>
                   Slots to replace: {s.slotsToReplace}<br></br>
                   Day off request sent: {s.dayOffRequestSent}<br></br>
                 </h3>
                 <br></br><br></br>
                 
                 <br></br> <br></br></li>               
             })}
          </ul>
          
        </div>
    

  )

}