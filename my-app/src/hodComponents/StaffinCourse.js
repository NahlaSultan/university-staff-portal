import React from 'react'
import '../styling/main.css';



export default function StaffinCourse({staff}) {
    return (

    
        <div>  
             <ul className="login100-form-title">Staff: <br></br></ul>
            <ul>
                {staff.map((item, i) => {
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