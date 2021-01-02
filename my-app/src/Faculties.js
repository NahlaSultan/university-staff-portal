import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import './main.css';



export default function Faculties() {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/viewFaculties')
    .then(res => {
        setFaculties(res.data)
        console.log("here")
        console.log(res.data)
      });  });




  return (

    
        <div>   
            <h2>Array of Faculties:</h2>
            <hr/>

                {faculties.map((fac, i) => {
                return <li key={fac._id}>
                <h2> {fac.facultyName} </h2>
                <ul>
                        {fac.departments.map((dep, i) => {
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
                <hr/>
                </li> })}
         
        </div>      


    

  )

}
