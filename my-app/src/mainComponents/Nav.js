
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import { Link } from 'react-router-dom'
import BellIcon from 'react-bell-icon';


export default function Nav() {
  const [bellHeader, setButtonHeader] = useState(false)

  useEffect(() => {
    console.log("I entered")
    axios
      .get('http://localhost:8000/academicMembers/notified', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        console.log(res.data)
        if (res.data.length > 0) {
          setButtonHeader(true)
        }

      })
  })
  function HandleClick(e) {
    setButtonHeader(false)
    //redirect to bell.js after that
  }
  return (
    <div className='nav'>
      <div >
        <ul className='nav-links'>
          <div className="Bell">
            <button onClick={HandleClick} >
              <BellIcon className="bell" width='40' active={bellHeader} animate={bellHeader} color='#fff' />
            </button>
          </div>
          <Link to='/home' >
            <li >
              <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
              </img>       </li>
          </Link>

          {/* <ul className= "nav-links"> */}
          <Link to='/logout' >
            <li > Log Out  </li>
          </Link>
        </ul>
      </div>

    </div>

  )
}

