import React, { useState, useRef } from 'react'
import {Link}  from 'react-router-dom'



import '../styling/App.css'
import '../styling/main.css';



export default function HRprofile() {

   return (
    <>
    <div className='App'> 
            <h2>HR PROFILE</h2>        <br/>

        </div> 

        <ul className= "listItem">
        <Link to = '/AddLocation'>
        <li > Add Location  </li>        <br/>

        </Link>   

        <Link to = '/AddFaculty'>
        <li > Add Faculty  </li>        <br/>

        </Link>  


        <Link to = '/AddCourse'>
        <li > Add Course  </li>
        <br/>
        </Link> 

        <Link to = '/hr/viewMissingHours'>
        <li > Staff Missing Hours  </li>
        <br/>
        </Link> 

        <Link to = '/hr/viewMissingDays'>
        <li > Staff Missing Days  </li>
        <br/>
        </Link> 

        <Link to = '/hr/addHR'>
        <li > Add HR Member  </li>
        <br/>
        </Link> 


        </ul>
    </>    
   )

 }