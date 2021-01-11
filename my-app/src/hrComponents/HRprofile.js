import React, { useState, useRef } from 'react'
import {Link}  from 'react-router-dom'


import SideNav from '../mainComponents/SideNav'
import Nav from '../mainComponents/Nav';
import '../styling/App.css'
import '../styling/main.css';



export default function HRprofile() {

   return (
    <>

    <div className='App'> 
            <h2>HR PROFILE</h2>        <br/>

        </div> 

        <ul className= "listItem">
        <Link to = '/hr/AddLocation'>
        <li > Add Location  </li>        <br/>

        </Link>   

        <Link to = '/hr/AddFaculty'>
        <li > Add Faculty  </li>        <br/>

        </Link>  


        <Link to = '/hr/AddCourse'>
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