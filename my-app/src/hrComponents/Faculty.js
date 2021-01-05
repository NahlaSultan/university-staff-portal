import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function Faculty({facultyName,departments }) {
    const [deps, setDeps] = useState([])
    const [toggle, setToggle] = useState(true)
    var facName = facultyName+""
    function HandleDeleteFaculty(){

        const body = {name: facName}
       axios   
       .post('http://localhost:8000/hr/deleteFaculty',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res=>console.log(res.data));
    
    }

    function HandleUpdateFaculty(){

       const body = {name: facName}
       axios   
       .post('http://localhost:8000/hr/deleteFaculty',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res=>console.log(res.data));
    
    }

     function HandleViewDepartments(){
        if(toggle){
 
               setDeps(departments)
           }
           else{
               setDeps([])
           }  
        setToggle(toggle => !toggle)
    }



  return (

    
    <div className='leftDiv'>   
  
                <h2> {facultyName} </h2>
                <button className = 'btn' onClick={HandleViewDepartments}>   View Departments  </button> 
                <ul>
                        {deps.map((dep, i) => {
                        return <ul key={dep._id}>
                            <h4> {dep.name} </h4>
                            <li> HOD: {dep.headOfDepartment} </li>
                            <li className='courseList' > Courses:
                                {dep.courses.map((c, i) => {
                                return <ul key={i} className='courseItem'>
                                    <h4> {c} </h4>
                                </ul>
                                })}
                            </li>
                            <br/>
                        </ul>
                        })}
                </ul>
                <button className = 'btn' onClick={HandleDeleteFaculty}>   Delete this Faculty  </button> 
                <button className = 'btn' onClick={HandleUpdateFaculty}>   Update this Faculty  </button> 


        </div>      


    

  )

}


