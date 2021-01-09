
import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../styling/App.css'
import '../styling/dropDown.css'


export default function Nav() {


  return (

    <div className='nav'>

      <div >
        <ul className="navList">


          <li >
            <Link to='/home' >
              <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
              </img>
            </Link>
          </li>
          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link to='/logout' >Sign In</Link>
              </button>   
            </div>
          </li>


          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link to='/logout' >Sign Out</Link>
              </button>   
            </div>
          </li>
          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link> My Profile</Link>
              </button>
              <div class="navdropdown-content" >
              <Link to='/logout' > view profile </Link>
              <Link to='/logout' > Reset Password </Link>
              <Link to='/logout' > </Link>

              </div>
            </div>
          </li>



          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link to='/logout' > Log out </Link>
              </button>   
            </div>
          </li>


        </ul>
      </div>




    </div>

  )
}

