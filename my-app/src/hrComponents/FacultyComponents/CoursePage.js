import React from 'react'
import { useLocation ,Link} from "react-router-dom";
import Course from './Course'

    
function CoursePage() {
    let locationReact=useLocation()
    const facultyName = locationReact.state.facultyName
    const dep = locationReact.state.dep

    // function backtodep(){
    //     history.push({
    //         pathname: '/hr/departmentsPage',
    //         state: { facultyName: fac.facultyName }
    //        })
    // }


    return (



<>
<br/>
<Link to='/hr/departmentsPage' className="linkPrev">&laquo;</ Link> <br/>

<h2>{facultyName}    </h2>
<h2>{dep.name} courses </h2>

<table className="table">
    <tr className="th">
    <th>Course Name</th>
    <th>Course Instructors</th>
    <th>TAs</th>
    <th>Number of Slots</th>
    <th>Manage Course</th>

    </tr>

        {dep.courses.map((c, i) => {
            return <tr className="th" key={c._id}>  
            <Course courseName={c} facultyName={facultyName} departmentName={dep.name} dep={dep}/>  
                </tr>
                })}


</table>
</>
    )
}

export default CoursePage
