import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';
import { Alert } from 'react-st-modal';


export default function Nav() {
  const [bellHeader, setButtonHeader] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [play, setPlay] = useState("")
  const [message, setMessage] = useState()
  const [message2, setMessage2] = useState()



  async function HandleSignIn() {

    await axios
      .get('http://localhost:8000/signIn', { headers: { 'token': localStorage.getItem('token') } })

      .then(res => setMessage(res.data))
  //  var temp = message


  }
  async function HandleSignOut() {

    await axios
      .get('http://localhost:8000/signOut', { headers: { 'token': localStorage.getItem('token') } })

      .then(res =>{
        setMessage2(res.data)
        console.log(res.data)

      } )

  }


  useEffect(async () => {

    if (message != null)
      await Alert(message, 'Sign In')

  }, [message]);


  useEffect(async () => {

    if (message2 != null)
      await Alert(message2, 'Sign Out')

  }, [message2]);
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
  }, [])
  function HandleClick(e) {
    console.log("Here")
    setButtonHeader(false)
  }


  return (




    <div className='nav'>

      <div >
        <ul className="navList">


          <li >
            <Link to='/sm/staffProfile' >
              <img className="nav-pic" src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
              </img>
            </Link>
          </li>

          <li>
            <div class="navdropdown" >
              <button class="navdropbtn" >
                <Link to='/sm/staffProfile' > Home </Link>
              </button>
            </div>
          </li>

          <li>
            <div class="navdropdown" >
              <button class="navdropbtn" onClick={HandleSignIn}>

                <Link  >Sign In</Link>


              </button>
            </div>
          </li>


          <li>
            <div class="navdropdown" >
              <button class="navdropbtn" onClick={HandleSignOut} >

                <Link  >Sign Out</Link>

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

              </div>
            </div>
          </li>



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
                <Link to='/sm/logout' > Log out </Link>
              </button>
            </div>
          </li>


        </ul>
      </div>





    </div>

  )
}