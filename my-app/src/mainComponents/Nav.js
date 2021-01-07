
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styling/App.css'
import '../styling/SideNav.css'

export default function Nav() {

  return (
    <div className='nav'>
    
      <div >
      <ul className='nav-links'>

        <Link to='/home' >  
        <li > 
        <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
                  </img>       </li>
             
        </Link>          

      {/* <ul className= "nav-links"> */}
        <Link to = '/logout' >
          <li > Log Out  </li>
        </Link> 
        </ul>     
      </div>   
      </div>   

  )
}

