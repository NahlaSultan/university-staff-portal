import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/App.css';
import { Link } from 'react-router-dom'

export default function StaffProfile() {
    const [message, setMessage] = useState("")
    const [message2, setMessage2] = useState("")
    function HandleSignIn(){
    
       axios   
       .get('http://localhost:8000/signIn', {headers:{'token':localStorage.getItem('token')}})
       
       .then(res=>setMessage(res.data));
    
    }
    function HandleSignOut(){
    
        axios   
        .get('http://localhost:8000/signOut', {headers:{'token':localStorage.getItem('token')}})
        
        .then(res=>setMessage2(res.data));
     
     }
    return (
        <>
            <div className='App'>
                <h1>Homepage</h1>
            </div>
            <ul className='link_list'>
                <Link className='a' to='/viewProfile'>
                    <li>View Profile </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/viewAttendance'>
                    <li>View Attendance </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/viewMonthAttendance'>
                    <li>View Month Attendance </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/viewMissingDays'>
                    <li>View Missing Days </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/viewMissingHours'>
                    <li>View Missing Hours </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/viewExtraHours'>
                    <li>View Extra Hours </li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/updateProfile'>
                    <li>Update Profile</li>
                </Link>
            </ul>
            <br></br>
            <br></br>
            <div className="buttons">
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
            <br></br>
            </div>
        </>

    )
}
