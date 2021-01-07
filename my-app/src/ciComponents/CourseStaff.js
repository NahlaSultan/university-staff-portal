import React from 'react'
import '../styling/main.css';



export default function CourseStaff({staff}) {
    return (

    
        <div>   
            <ul>
                {staff.map((item, i) => {
                return <li key={i}>
                <ul> Name: {item.name} </ul>
                <ul> Email: {item.email} </ul> 
                <ul> Role: {item.role} </ul> 
                <ul> Courses: {item.course} </ul> 
                <ul> Faculty: {item.faculty} </ul> 
                <ul> Department: {item.department} </ul> 
                <ul> office: {item.officeLocation} </ul> 
                <br/>
                
                
                </li>

                })}
             </ul>
        </div>      


    

  )
}