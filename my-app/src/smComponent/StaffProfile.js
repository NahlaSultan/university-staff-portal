import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/App.css';
import { Link } from 'react-router-dom'
import SideNav from '../mainComponents/SideNav';
import Nav from '../mainComponents/Nav';
export default function StaffProfile() {
    // const [message, setMessage] = useState("")
    // const [message2, setMessage2] = useState("")
    // function HandleSignIn(){
    
    //    axios   
    //    .get('http://localhost:8000/signIn', {headers:{'token':localStorage.getItem('token')}})
       
    //    .then(res=>setMessage(res.data));
    //    setMessage2("")
    
    // }
    // function HandleSignOut(){
    
    //     axios   
    //     .get('http://localhost:8000/signOut', {headers:{'token':localStorage.getItem('token')}})
        
    //     .then(res=>setMessage2(res.data));
    //     setMessage("")
     
    //  }
    return (
        <>
        <Nav/>
    <SideNav/>
    
            <div className='App'>
                <h1>Homepage</h1>
            </div>
            {/* <ul className='link_list'>
                <Link className='a' to='/sm/viewProfile'>
                    <li>View Profile </li>
                </Link>
            </ul> */}
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/viewAttendance'>
                    <li>View Attendance </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/viewMonthAttendance'>
                    <li>View Month Attendance </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/viewMissingDays'>
                    <li>View Missing Days </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/viewMissingHours'>
                    <li>View Missing Hours </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/viewExtraHours'>
                    <li>View Extra Hours </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/sm/updateProfile'>
                    <li>Update Profile</li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            {/* <div className="buttons`">
                <button onClick={HandleSignIn} className="buttons">
                    Sign In
        </button>
        <r1> {message}</r1>
            </div>
            <br></br>
            <br></br>
            <div className="buttons">
                <button onClick={HandleSignOut} className="buttons">
                    Sign Out
        </button>
        <r1> {message2}</r1>
        <br></br>
            <br></br> */}
            {/* </div> */}
        </>

    )
}
