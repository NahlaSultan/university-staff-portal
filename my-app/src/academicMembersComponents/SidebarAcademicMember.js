import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarAcademicMember = [
  {
    title: 'View Schedule',
    path: '/academic/schedule',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Send Replacements',
    path: '/academic/manageReplacement',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Change Day Off',
    path: '/academic/changeDayOff',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

];