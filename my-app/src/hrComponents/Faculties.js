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

            <Link to = '/AddFaculty'>
            <li > Add Faculty  </li>
            </Link> 
 
            <Link to = '/AddCourse' >
            <li > Add Course  </li>
            </Link> 
            <hr/>
            <h2>GUC Faculties:</h2>


                {faculties.map((fac, i) => {
                return <li key={fac._id}>
                <Faculty fac={fac}   />             
                </li> })}
         
        </div>      


    

  )

}
