
import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';
import useSound from 'use-sound';
import boopSfx from './bell.mp3';

export default function Nav() {
  const [bellHeader, setButtonHeader] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [play, setPlay] = useState("")
  const [playOff] = useSound(
    './bell.mp3',
    { volume: 0.25 }
  );
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
        <ul className='nav-links'>



          <Link to='/home' >
            <li >
              <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
              </img>       </li>
          </Link>
          <div style={{marginTop:'2%'}} className="Bell">
            <button onClick={HandleClick} >
              <Link to='/academic/Bell'>
                <BellIcon className="bell" width='40' active={bellHeader} animate={bellHeader} color='#fff' />
              </Link>
            </button>
          </div>
          {/* <ul className= "nav-links"> */}
          <Link to='/logout' >
            <li > Log Out  </li>
          </Link>
        </ul>
      </div>

    </div>

  )
}

