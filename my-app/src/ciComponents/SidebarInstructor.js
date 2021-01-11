import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
export const SidebarInstructor = [
  {
    title: 'Home',
    path: '/StaffProfile',
    // icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Coordinator',
    path: '/ci/assignCourseCoordinator',
    // icon: <AiIcons.AiOutlineUserAdd />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Course',
    path: '/ci/updateAssignedCourse',
    // icon: <AiIcons.AiOutlineSolution />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Slot',
    path: '/ci/assignSlots',
    // icon: <AiIcons.AiOutlineFieldTime />,
    cName: 'nav-text'
  },
  {
    title: 'View Course Coverage',
    path: '/ci/viewCoverages',
    // icon: <IoIcons.IoIosCheckbox />,
    cName: 'nav-text'
  },
  {
    title: 'Remove Assigned Course',
    path: '/ci/removeAssignedCourse',
    // icon: <BsIcons.BsFillTrashFill/>,
    cName: 'nav-text'
  },
  {
    title: 'View Course Staff',
    path: '/ci/viewCourseStaff',
    // icon: <BiIcons.BiGroup/>,
    cName: 'nav-text'
  },
  {
    title: 'View Department Staff',
    path: '/ci/viewDepartmentStaff',
    // icon: <BiIcons.BiGroup />,
    cName: 'nav-text'
  },
  {
    title: 'View My Slots',
    path: '/ci/viewSlots',
    // icon: <AiIcons.AiTwotoneSchedule />,
    cName: 'nav-text'
  }, {
    title: '',
    
    cName: 'nav-text'
  }
  
];