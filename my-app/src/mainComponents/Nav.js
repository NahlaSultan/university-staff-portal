

import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';
// import useSound from 'use-sound';
import boopSfx from './bell.mp3';

export default function Nav() {
  const [bellHeader, setButtonHeader] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [play, setPlay] = useState("")
  // const [playOff] = useSound(
  //   './bell.mp3',
  //   { volume: 0.25 }
  // );
  useEffect(() => {
    console.log("I entered")
    axios
      .get('http://localhost:8000/academicMembers/notified', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        console.log(res.data)
        if (res.data.length > 0) {
          setButtonHeader(true)
          setPlay("playOff")
        }

      })
  })
  function HandleClick(e) {
    console.log("Here")
    setButtonHeader(false)
  }


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
          
           
    <div style={{marginTop:'1%'}} className="Bell">
            <button onClick={HandleClick} >
              <Link to='/academic/Bell'>
                <BellIcon className="bell" width='40' active={bellHeader} animate={bellHeader} color='#fff' />
              </Link>
            </button>
          </div>
    


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

