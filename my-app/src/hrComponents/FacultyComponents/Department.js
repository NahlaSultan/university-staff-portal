import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useHistory } from "react-router-dom";


export default function Department({facultyName,dep }) {
    const [courses, setCourses] = useState([])
    const [toggle, setToggle] = useState(false)
    var facName = facultyName+""
    let history = useHistory();

    function HandleDeleteDepartment(){

        const body = {facultyName: facName, department:dep.name 
    }
       axios   
       .post('http://localhost:8000/hr/deleteDepartment',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res=>console.log(res.data));
    
    }

    function HandleUpdateDepartment(){
        history.push({
            pathname: '/hr/updateDepartment',
            state: { facultyName: facultyName,
            departmentName:dep.name }
           }) 
    }

    function HandleAddCourse(){
        history.push({
            pathname: '/hr/addCourse',
            state: { facultyName: facultyName,
                departmentName:dep.name}
           })
       
    
    }
    // function HandleAddCourses(){
    //     history.push({
    //         pathname: '/hr/addDepartment',
    //         state: { facultyName: fac.facultyName }
    //        })
    // }
   

     function HandleViewCourses(){
        if(toggle){
 
               setCourses(dep.courses)
           }
           else{
               setCourses([])
           }  
        setToggle(toggle => !toggle)
    }



  return (

    
   <tr>
    <td>{dep.name}</td>
    <td>{dep.headOfDepartment}</td>
    <td><button className = 'btn' onClick={HandleViewCourses}>   View Courses  </button> 
    <ul>

        <li className='courseList' > 
            {courses.map((c, i) => {
            return <ul key={i} className='courseItem'>
                <h4> {c} </h4>
            </ul>
            })}
        </li>

    </ul> 
    
    </td>
    <td> 
        <button className = 'btn' onClick={HandleAddCourse}>   Add Course   </button> 
        <button className = 'btn' onClick={HandleDeleteDepartment}>   Delete   </button> 
        <button className = 'btn' onClick={HandleUpdateDepartment}>   Update   </button> 
    </td>
    </tr>

  )

}

                {/* <ul>

                            <li className='courseList' > 
                                {courses.map((c, i) => {
                                return <ul key={i} className='courseItem'>
                                    <h4> {c} </h4>
                                </ul>
                                })}
                            </li>
                            <br/>

                </ul> */}
  

            /* <button className = 'btn' onClick={HandleAddDepartments}>   Add Departments  </button>  */
               
         


    



