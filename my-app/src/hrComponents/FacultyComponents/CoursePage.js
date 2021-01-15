import React, {useEffect} from 'react'
import { useLocation ,Link, useHistory} from "react-router-dom";
import Course from './Course'
import axios from 'axios'
    
function CoursePage() {
    let history = useHistory()
    useEffect(() => {
        
        const checkToken = async()=>{
            if(localStorage.getItem('token')){
              console.log("TOKENS")
              await axios
              .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
              .then(res => {
              if(!res.data.includes('HR members')) {
                history.push('/error')
              } 
              });
            }
            else{
              console.log("NOT TOKENS")
              history.push('/')
        
            }
    
        }
        checkToken()
    },[]);

    let locationReact=useLocation()
    const facultyName = locationReact.state.facultyName
    const dep = locationReact.state.dep
   
    function backtodep(){
        console.log("back to dep")
        history.push({
            pathname: '/hr/departmentsPage',
            state: { facultyName: facultyName }
           })
    }


    return (



<>
<br/>
<button onClick={backtodep} className="linkPrev">
<Link  >&laquo;</ Link> 
    </button>
    
    <br/>

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
