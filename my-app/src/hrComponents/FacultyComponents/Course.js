import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useHistory } from "react-router-dom";

export default function Course({ courseName, facultyName, departmentName }) {
  const [course, setCourse] = useState([])
  let history = useHistory()

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      await
        axios
          .post('http://localhost:8000/hr/viewCourse', { courseName: courseName }, { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setCourse(res.data)
          });
    };
    fetchData();


  }, []);


  function HandleDeleteCourse() {

    const body = { facultyName: facultyName, departmentName: departmentName, courseName: courseName }

    axios
      .post('http://localhost:8000/hr/deleteCourse', body, { headers: { 'token': localStorage.getItem('token') } })
      .then(res => console.log(res.data));

  }

  function HandleUpdateCourse() {
    history.push({
      pathname: '/hr/updateCourse',
      state: { facultyName: facultyName, departmentName: departmentName, courseName: courseName }
    })
  }

  //     }
  //     // function HandleAddCourses(){
  //     //     history.push({
  //     //         pathname: '/hr/addDepartment',
  //     //         state: { facultyName: fac.facultyName }
  //     //        })
  //     // }



  return (
    <>
      <td> <h3> {courseName} </h3></td>

      <td> {course.instructors} </td>
      <td> {course.teachingAssistants} </td>
      <td> {course.teachingSlotsNumber} </td>
      <td> <button className='btn' onClick={HandleDeleteCourse}>   Remove from department   </button>
        <button className='btn' onClick={HandleUpdateCourse}>   Update Course   </button>  </td>



    </>

    //     const [courses, setCourses] = useState([])
    //     const [toggle, setToggle] = useState(false)
    //     var facName = facultyName+""
    //     let history = useHistory();

    //     function HandleDeleteDepartment(){

    //         const body = {facultyName: facName, department:dep.name 
    //     }
    //        axios   
    //        .post('http://localhost:8000/hr/deleteDepartment',body, { headers: { 'token': localStorage.getItem('token') } })
    //        .then(res=>console.log(res.data));

    //     }

    //     function HandleUpdateDepartment(){
    //         history.push({
    //             pathname: '/hr/updateDepartment',
    //             state: { facultyName: facultyName,
    //             dep:dep }
    //            })


    //     }
    //     // function HandleAddCourses(){
    //     //     history.push({
    //     //         pathname: '/hr/addDepartment',
    //     //         state: { facultyName: fac.facultyName }
    //     //        })
    //     // }


    //      function HandleViewCourses(){
    //         if(toggle){

    //                setCourses(dep.courses)
    //            }
    //            else{
    //                setCourses([])
    //            }  
    //         setToggle(toggle => !toggle)
    //     }



    //   return (


    //     <div className='leftDiv'>   

    //                 <li> HOD: {dep.headOfDepartment} </li>

    //                 {/* <button className = 'btn' onClick={HandleAddDepartments}>   Add Departments  </button>  */}
    //                 <button className = 'btn' onClick={HandleViewCourses}>   View Courses  </button> 
    //                 <ul>

    //                             <li className='courseList' > 
    //                                 {courses.map((c, i) => {
    //                                 return <ul key={i} className='courseItem'>
    //                                     <h4> {c} </h4>
    //                                 </ul>
    //                                 })}
    //                             </li>
    //                             <br/>

    //                 </ul>
    //                 <button className = 'btn' onClick={HandleDeleteDepartment}>   Delete   </button> 
    //                 <button className = 'btn' onClick={HandleUpdateDepartment}>   Update   </button> 
    //                 <br/><br/>


    //         </div>      




  )

}


