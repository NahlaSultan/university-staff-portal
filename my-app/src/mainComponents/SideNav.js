import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styling/SideNav.css';
import { IconContext } from 'react-icons';
import { SidebarCoordinator } from '../coordinatorComponents/SidebarCoordinator';
import { SidebarInstructor } from '../ciComponents/SidebarInstructor';
import { SidebarAcademicMember } from '../academicMembersComponents/SidebarAcademicMember';
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
             {/* Start SOFIA */}
            {/* {SidebarInstructor.map((item, index) => { */}
            {/* end SOFIA */}

            {/* start nahla */}

            {SidebarData.map((item, index) => {

          

            {/* end nahla */}
            {/* /////////////////////////////////////////////// */}
            {/* start sara */}
            {/* Start sara coor */}
            {/* {SidebarCoordinator.map((item, index) => { */}
            {/* end sara coor */}

            {/* // start sara adacemic */}

            {/* {SidebarAcademicMember.map((item, index) => { */}

            {/* // {SidebarAcademicMember.map((item, index) => { */}

              // end sara academic
              ///////////////////////////////////////////////////////              
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
