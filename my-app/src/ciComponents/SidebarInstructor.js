import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarInstructor = [
  {
    title: 'Home',
    path: '/ci/InstructorProfile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Coordinator',
    path: '/ci/assignCourseCoordinator',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Course',
    path: '/ci/updateAssignedCourse',
    icon: <FaIcons.FaAirbnb />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Slot',
    path: '/ci/assignSlots',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Course Coverage',
    path: '/ci/viewCoverages',
    icon: <IoIcons.IoIosCheckbox />,
    cName: 'nav-text'
  },
  {
    title: 'Remove Assigned Course',
    path: '/ci/removeAssignedCourse',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'View Course Staff',
    path: '/ci/viewCourseStaff',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'View Department Staff',
    path: '/ci/viewDepartmentStaff',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'View My Slots',
    path: '/ci/viewSlots',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
];