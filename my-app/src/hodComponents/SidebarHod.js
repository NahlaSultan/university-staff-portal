import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarHod = [
  {
    title: 'Home',
    path: '/homeHOD',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Instructor',
    path: '/hod/assignInstructor',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Delete Instructor',
    path: '/hod/deleteInstructor',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Update Instructor',
    path: '/hod/updateInstructor',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Staff',
    path: '/hod/viewAllStaff',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Staff in Course',
    path: '/hod/viewStaffinCourse',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Day off of All Staff',
    path: '/hod/viewDayOffAllStaff',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Day off of Single Staff',
    path: '/hod/viewDayOffSingleStaff',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View All Requests',
    path: '/hod/viewAllRequests',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'View Change Day off Requests',
    path: '/hod/viewChangeDayOffRequests',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'View Leave Requests',
    path: '/hod/viewLeaveRequests',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'View Course Coverage',
    path: '/hod/viewCourseCoverage',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'View Teaching Assignments',
    path: '/hod/viewTeachingAssignments',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Accept Change Day off Request',
    path: '/hod/acceptChangeDayOffRequest',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Reject Change Day off Request',
    path: '/hod/rejectChangeDayOffRequest',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Accept Leave Request',
    path: '/hod/acceptLeaveRequest',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Reject Leave Request',
    path: '/hod/rejectLeaveRequest',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];