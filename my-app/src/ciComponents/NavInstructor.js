
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styling/App.css'


export default function NavInstructor() {

    return (
        <nav>
            <h3>  Instructor  </h3>
            <ul className="nav-links">
                <Link to='/'>
                    <li> login  </li>
                </Link>

            </ul>
        </nav>
    )
}