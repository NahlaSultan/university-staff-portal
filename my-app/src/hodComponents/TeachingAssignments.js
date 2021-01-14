import React from 'react'
import '../styling/main.css';



export default function StaffinCourse({teachAss}) {
    return (

    
        <div>  
             {/* <ul className="login100-form-title">Teaching Assignments: <br></br></ul> */}
            <ul>
                {teachAss.map((s, i) => {
                return <li key={i}>
                <h2>Slot</h2>
                <h4>
                    {s[0]}<br></br>
                    {s[1]}<br></br>
                    {s[2]}<br></br>
                    {s[3]}<br></br>
                    {s[4]}<br></br>
                    {s[5]}<br></br>
                </h4>                   
               <br></br>
               <br></br>
                
                </li>

                })}
             </ul>
        </div>      


    

  )
}