import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarCoordinator = [
  {
    title: 'Home',
    path: '/coordinatorProfile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Slot',
    path: '/coordinator/addSlot',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Slots',
    path: '/coordinator/manageSlots',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

];