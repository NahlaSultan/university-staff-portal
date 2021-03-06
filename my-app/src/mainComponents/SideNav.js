import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import '../styling/SideNav.css';
import { IconContext } from 'react-icons';
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';
import { Alert } from 'react-st-modal';



export default function SideNav() {

  const [bellHeader, setButtonHeader] = useState(false)
  const [play, setPlay] = useState("")
  const [message, setMessage] = useState()
  const [message2, setMessage2] = useState()



  async function HandleSignIn() {

    await axios
      .get('http://localhost:8000/signIn', { headers: { 'token': localStorage.getItem('token') } })

      .then(res => setMessage(res.data))
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

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

const array = JSON.parse(localStorage.getItem('navArray'))

return (
    <>
<div >
<IconContext.Provider value={{ color: '#fff' }}>

<div className='nav'>

<div >

  <ul className="navList">

  <li >
  <Link to='#' className='menu-bars'>
      <FaIcons.FaBars onClick={showSidebar} />
    </Link>
    </li>
  

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

    <li  className="Bell">
      <button onClick={HandleClick} >
        <Link to='/academic/Bell'>
          <BellIcon className="bell" width='40' active={bellHeader} animate={bellHeader} color='#fff' />
        </Link>
      </button>
    </li>
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
    
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {array.map((item, index) => {
           
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {/* {item.icon} */}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      </div>
    </>
  );
}
