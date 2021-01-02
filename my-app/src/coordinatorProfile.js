import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'

export default function coordinatorProfile() {
    return (
        <>
            <div className='App'>
                <h1>Coordinator Homepage</h1>
            </div>
            <ul className='link_list'>
                <Link className='a' to='/coordinator/manageSlots'>
                    <li>Manage Slots </li>
                </Link>
                {/* <Link to='/'>
                    <li> login  </li>
                </Link> */}

            </ul>

        </>

    )
}
