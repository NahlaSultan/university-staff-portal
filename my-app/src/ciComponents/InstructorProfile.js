import React, { useRef, useState, useEffect } from 'react'
import '../styling/App.css';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function InstructorProfile() {

    let history = useHistory()
    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('token')) {
                console.log("TOKENS")
                await axios
                    .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token') })
                    .then(res => {
                        if (!res.data.includes('courseInstructors')) {
                            history.push('/error')
                        }
                    });
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
                <h1>Instructor Homepage</h1>
            </div>
            <ul className='link_list'>
                <Link className='a' to='/ci/AssignSlots'>
                    <li>Assign Slots </li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/updateAssignedCourse'>
                    <li>Assign Course </li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/removeAssignedCourse'>
                    <li>Remove Assigned Course</li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/assignCourseCoordinator'>
                    <li>Assign Coordinator </li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/viewSlots'>
                    <li>View My Slots</li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/viewDepartmentStaff'>
                    <li>View Department Staff</li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/viewCourseStaff'>
                    <li>View Course Staff </li>
                </Link>

            </ul>
            <br></br>
            <br></br>
            <ul className='link_list'>
                <Link className='a' to='/ci/viewCoverage'>
                    <li>View Course/s Coverage </li>
                </Link>

            </ul>
            <br></br>
            <br></br>
        </>

    )
}
