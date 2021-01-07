import React, { useState, useRef } from 'react'
import {Link}  from 'react-router-dom'



import '../styling/App.css'
import '../styling/main.css'



export default function HRprofile() {

   return (
    <>
    <div className='App'> 
            <h2>HR PROFILE</h2>
        </div> 

        <ul className= "nav-links">
        <Link to = '/AddLocation'>
        <li > Add Location  </li>
        </Link>   

        <Link to = '/AddFaculty'>
        <li > Add Faculty  </li>
        </Link>  


        <Link to = '/AddCourse'>
        <li > Add Course  </li>
        </Link> 

        <Link to = '/hr/viewMissingHours'>
        <li > Staff Missing Hours  </li>
        </Link> 

        <Link to = '/hr/viewMissingDays'>
        <li > Staff Missing Days  </li>
        </Link> 



        </ul>
    </>    
   )

 }