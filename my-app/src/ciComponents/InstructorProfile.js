import React from 'react'
import '../styling/App.css';
import { Link } from 'react-router-dom'

export default function InstructorProfile() {
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
