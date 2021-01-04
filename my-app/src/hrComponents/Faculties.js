import React,{useRef, useState, useEffect} from 'react'
import {Link}  from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';

import Faculty from './Faculty'



export default function Faculties() {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hr/viewFaculties',{ headers: { 'token': localStorage.getItem('token') } })
    .then(res => {
        setFaculties(res.data)
      });  });




  return (

    
        <div>   
            <h2>Array of Faculties:</h2>

            <Link to = '/AddFaculty'>
            <li > Add Faculty  </li>
            </Link> 
            <Link to = '/AddDepartment' >
            <li > Add Department  </li>
            </Link>  
            <Link to = '/AddCourse' >
            <li > Add Course  </li>
            </Link> 
            <hr/>

                {faculties.map((fac, i) => {
                return <li key={fac._id}>
                <Faculty facultyName={fac.facultyName}  departments= {fac.departments}   />             
                <hr/>
                </li> })}
         
        </div>      


    

  )

}
