import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Alert } from 'react-st-modal';
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';




export default function Nav() {

  // const [bellHeader, setButtonHeader] = useState(localStorage.getItem('bell'))
  const [bellHeader, setButtonHeader] = useState(false)
  const [notif, setNotif] = useState(-1)
  const [clicked, setClicked] = useState(false)
  const [play, setPlay] = useState("")
  const [message, setMessage] = useState()
  const [message2, setMessage2] = useState()
  

  function HandleSignIn() {

    axios
      .get('http://localhost:8000/signIn', { headers: { 'token': localStorage.getItem('token') } })

      .then(res => setMessage(res.data))




  }
  function HandleSignOut() {
    axios
      .get('http://localhost:8000/signOut', { headers: { 'token': localStorage.getItem('token') } })

      .then(res => setMessage(res.data))

  }
  useEffect(() => {

    const timer = setTimeout(async () => {
      await axios
        .get('http://localhost:8000/academicMembers/notified', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => { setNotif(res.data) })
      if (notif.length > 0) {

        setButtonHeader(true)
        localStorage.setItem('bell', true)
        console.log(bellHeader)
        setPlay("playOff")

      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [notif])

  function HandleClick(e) {
    console.log("Here")
    setButtonHeader(false)
    localStorage.setItem('bell', false)
    // window.location.reload()


  }
  useEffect(async () => {

    if (message != null)
      await Alert(message, 'Sign In')

  }, [message]);


  useEffect(async () => {

    if (message2 != null)
      await Alert(message2, 'Sign Out')

  }, [message2]);


  return (
    <>
      <r1>{message}</r1>
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

                <button class="navdropbtn" onClick={HandleSignIn}>
                  <Link  >Sign In</Link>

                </button>

          <li>
            <div class="navdropdown" >
              <button class="navdropbtn" onClick={HandleSignIn}>
              <Link to="/sm/signIn" >Sign In</Link>
              </div>
            </li>


            <li>
              <div class="navdropdown" >

                <button class="navdropbtn" onClick={HandleSignOut} >
                  <Link >Sign Out</Link>
                </button>
              </div>
            </li>
            <li>
              <div class="navdropdown" >
                <button class="navdropbtn">
                  <Link> My Profile</Link>
                </button>
                <div class="navdropdown-content" >

                  <Link to='/sm/viewProfile' > view profile </Link>
                  <Link to='/sm/resetPassword' > Reset Password </Link>
                  <Link to='/logout' > </Link>

          <li>
            <div class="navdropdown" >
              <button class="navdropbtn"onClick={HandleSignOut} >
              <Link to="/sm/signOut" >Sign Out</Link>
              </button>   
            </div>
          </li>
          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link> My Profile</Link>
              </button>
              <div class="navdropdown-content" >
              <Link to='/sm/viewProfile' > view profile </Link>
              <Link to='/sm/resetPassword' > Reset Password </Link>
              <Link  > </Link>


                </div>
              </div>
            </li>


          <li>
            <div class="navdropdown" >
              <button class="navdropbtn">
              <Link to='/sm/logout' > Log out </Link>
              </button>   
            <div style={{ marginTop: '1%' }} className="Bell">
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
    </>

  )
}