import React from 'react'
import '../styling/App.css';
import { Link } from 'react-router-dom'

export default function StaffProfile() {
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
        </>

    )
}
