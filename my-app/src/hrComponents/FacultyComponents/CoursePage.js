import React from 'react'
import { useLocation } from "react-router-dom";
import Course from './Course'

    
function CoursePage() {
    let locationReact=useLocation()
    const facultyName = locationReact.state.facultyName
    const dep = locationReact.state.dep


    return (



<>
<br/>
<h1>{facultyName}    </h1>
<h1>course page   </h1>

<table className="table">
    <tr className="th">
    <th>Course Name</th>
    <th>Course Instructors</th>
    <th>TAs</th>
    <th>Number of Slots</th>

    </tr>

        {dep.courses.map((c, i) => {
            return <tr className="th" key={c._id}>  
            <Course courseName={c} />  
                </tr>
                })}


</table>
</>
    )
}

export default CoursePage
