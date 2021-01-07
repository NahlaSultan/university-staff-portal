import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function Faculty({facultyName,departments }) {
    const [deps, setDeps] = useState([])
    const [toggle, setToggle] = useState(true)


     function HandleViewDepartments(){
        if(toggle){
 
               setDeps(departments)

           }
           else{
               setDeps([])
   
           }  
        setToggle(toggle => !toggle);


    
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

        </div>      


    

  )

}


