
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styling/App.css'


export default function Nav() {

  return (
    <nav>
    
      <div >
        <Link to='/home'>  
        <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
                  </img>            
        </Link>          
      </div>   

      <ul className= "nav-links">
        <Link to = '/logout'>
          <li > Log Out  </li>
        </Link>      
      </ul>
      
    </nav>
  )
}

