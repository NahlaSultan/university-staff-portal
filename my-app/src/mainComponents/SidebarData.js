import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [

  {
    title: 'Faculties',
    path: '/hr/faculties',
    //icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Locations',
    path: '/hr/locations',
    //icon: <FaIcons.FaAirbnb />,
    cName: 'nav-text'
  },

  {
    title: 'Manage Staff',
    path: '/hr/staffs',
    //icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Attendance',
    path: '/hr/manageAttendance',
    //icon: <IoIcons.IoIosCheckbox />,
    cName: 'nav-text'
  }
];