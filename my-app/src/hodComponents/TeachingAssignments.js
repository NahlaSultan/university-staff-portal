import React from 'react'
import '../styling/main.css';



export default function StaffinCourse({teachAss}) {
    return (

    
        <div>  
             <ul className="login100-form-title">Teaching Assignments: <br></br></ul>
            <ul>
                {teachAss.map((item, i) => {
                return <li key={i}>
               {item}
               <br></br>
               <br></br>
                
                </li>

                })}
             </ul>
        </div>      


    

  )
}