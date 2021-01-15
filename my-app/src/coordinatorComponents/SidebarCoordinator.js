import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarCoordinator = [

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
  {
    title: 'Manage Slot Linking Request',
    path: '/coordinator/ManageLinkingRequest',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: '',
    cName: 'nav-text'
  },
];