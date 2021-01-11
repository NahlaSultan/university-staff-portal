import React from 'react'
import '../../styling/main.css';
import '../../styling/tables.css';

import { useLocation } from "react-router-dom";
import Department from './Department'

function DepartmentPage() {
    let locationReact=useLocation()
    const facultyName = locationReact.state.fac.facultyName
    const deps = locationReact.state.fac.departments

    return (

        <>
        <br/>
        <h1>{facultyName}    </h1>
        <table className="table">
            <tr className="th">
            <th>Department Name</th>
            <th>Head Of Departments</th>
            <th>Courses</th>
            <th>Manage Department</th>
            <th>Manage Courses</th>

            </tr>

     
                {deps.map((dep, i) => {
                    return <tr className="th" key={dep._id}>  
                    <Department facultyName={facultyName} dep={dep} />  
                        </tr>
                        })}
      
   
        </table>
        </>
    )
}

export default DepartmentPage

