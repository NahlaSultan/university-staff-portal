import React from 'react'
import '../../styling/main.css';
import { useLocation } from "react-router-dom";
import Department from './Department'

function DepartmentPage({dep}) {
    let locationReact=useLocation()
    const facultyName = locationReact.state.fac.facultyName
    const deps = locationReact.state.fac.departments

    return (
        <table>
            <tr>
            <th>Department Name</th>
            <td>Head Of Departments</td>
            <td>Manage Departments</td>
            </tr>

     
                {deps.map((dep, i) => {
                    return <ul key={dep._id}>                          
                    <Department facultyName={facultyName} dep={dep} /> 
                    <br/>
                        </ul>
                        })}
      
   
        </table>
    )
}

export default DepartmentPage

