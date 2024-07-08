import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Projects',
    path: '/admin/epins/generate',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/admin/epins/unused' },
      { title: 'Web Design', path: '/admin/epins/generate' },
      { title: 'Graphic Design', path: '/admin/epins/transfer' },
    ],
  },
  {
    title: 'Messages',
    path: '/admin/epins/transfer',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/admin/epins/unused',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/admin/epins/transfer' },
      { title: 'Privacy', path: '/admin/epins/transfer' },
    ],
  },
  {
    title: 'Help',
    path: '/admin/epins/used',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];