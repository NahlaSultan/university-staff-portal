import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/App.css';
import SideNav from '../mainComponents/SideNav';
import Nav from '../mainComponents/Nav';
import { Link, useHistory } from 'react-router-dom'
export default function StaffProfile() {
    let history = useHistory()
    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('token')) {
                console.log("TOKENS")

            }
            else {
                console.log("NOT TOKENS")
                history.push('/')

            }

        }
        checkToken()
    }, []);
    return (
        <>

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
