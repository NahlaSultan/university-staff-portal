
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styling/App.css'


export default function NavCoordinator() {

    return (
        <nav>
            <h3>  Coordinators  </h3>
            <ul className="nav-links">
                <Link to='/coordinator/addSlot'>
                    <li> add slot </li>
                </Link>
                <Link to='/'>
                    <li> login  </li>
                </Link>

            </ul>
        </nav>
    )
}