
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


export default function Nav() {

  return (
    <nav>
        <h3>  HR Members  </h3>
        <ul className= "nav-links">
            <Link to='/hr/addStaff'>  
            <li> add staff member </li>
            </Link>
            <Link to='/hr/locations'>  
            <li> Locations </li>
            </Link>
            here
            <Link to = '/login'>
            <li> login  </li>
            </Link>
            <Link to = '/hr/faculties'>
            <li> login  </li>
            </Link>
            

     </ul>
    </nav>
  )
}

