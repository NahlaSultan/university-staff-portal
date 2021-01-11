import React from 'react'
import '../styling/main.css';



export default function StaffinCourse({staff}) {
    return (

    
        <div>  
            
             <ul className='viewStaff' >
             {staff.map((st,i) =>{
               return <li key={i}>
                 <h1>
                   Staff ID: {st.memberID}
                 </h1>
                 <h3>
                   Name: {st.name}<br></br>
                   Email: {st.email}<br></br>
                   Role: {st.role}<br></br>
                   Day Off: {st.dayOff}<br></br>
                   Office Locaion: {st.officeLocation}<br></br>
                   Annual leaves balance: {st.annualLeavesBalance}<br></br>
                   Leaves: {st.leaves}<br></br>
                   Request replacement sent: {st.requestReplacementSent}<br></br>
                   Request replacement received: {st.requestReplacmentReceived}<br></br>
                   Coordinator linking requests: {st.coordinatorLinkingRequests}<br></br>
                   Courses: {st.course}<br></br>
                   Slots assigned: {st.slotsAssigned}<br></br>
                   Slots replaced: {st.slotsReplaced}<br></br>
                   Slots to replace: {st.slotsToReplace}<br></br>
                   Day off request sent: {st.dayOffRequestSent}<br></br>
                 </h3>
                 <br></br><br></br>
                 
                 <br></br> <br></br></li>               
             })}
          </ul>
        </div>      


    

  )
}