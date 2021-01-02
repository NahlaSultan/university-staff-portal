
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


export default function Nav() {

  return (
    <nav>
      <h3> Profile Page </h3>
      <ul className="nav-links">
        <Link to='/hr/addStaff'>
          <li> add staff member </li>
        </Link>
        <Link to='/login'>
          <li> login  </li>
        </Link>

      </ul>
    </nav>
  )
}

