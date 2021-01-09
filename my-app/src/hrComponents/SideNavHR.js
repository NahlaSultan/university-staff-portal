import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../styling/SideNav.css';
import '../styling/dropDown.css';

import { IconContext } from 'react-icons';

import * as IoIcons from 'react-icons/io';

export default function SideNav() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>


                        <li className='nav-text'>
                            <Link to='/hr/home'>
                                <AiIcons.AiFillHome />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li className='nav-text'>
                            <Link to='/hr/faculties'>
                                <IoIcons.IoIosPaper />
                                <span>Faculties</span>
                            </Link>
                        </li>

                        <li className='nav-text'>
                            <Link to='/hr/locations'>
                                <FaIcons.FaAirbnb />
                                <span>Locations</span>
                            </Link>
                        </li>

                        <li className='nav-text'>
                            <Link to='/hr/home'>
                                <AiIcons.AiFillHome />
                                <span>Home</span>
                            </Link>
                        </li>

                        <div class="sidenavdropdown" >
                            <li className='nav-text'>
                                <Link >
                                    <IoIcons.IoIosPaper />
                                    <span>Add Staff</span>
                                </Link>
                                    <div class="sidenavdropdown-content" >
                                        <li>  <Link to='/hr/addStaff' > academic </Link></li>
                                        <li>    <Link to='/hr/addHR' > hr </Link> </li>
                                    </div>


                            </li>
                        </div>


                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

//   {
//     title: 'Add Staff',
//     path: '/hr/addStaff',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Staffs',
//     path: '/hr/staffs',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Manage Attendance',
//     path: '/hr/manageAttendance',
//     icon: <IoIcons.IoIosCheckbox />,
//     cName: 'navdropdown'
//   },
//   {
//     title: 'Messages',
//     path: '/messages',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Support',
//     path: '/support',
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: 'nav-text'
//   }