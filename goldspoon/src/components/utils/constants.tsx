import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'E-Pins',
    path: '/admin/epins',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Generate', path: '/admin/epins/generate' },
      { title: 'Re topup', path: '/admin/epins/retopup' },
      { title: 'Transfer', path: '/admin/epins/transfer' },
      { title: 'Unused', path: '/admin/epins/unused' },
      { title: 'Used', path: '/admin/epins/used' },
    ],
  },
  {
    title: 'Installments',
    path: '/admin/intallments',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Add', path: '/admin/intallments/add' },
      { title: 'History', path: '/admin/intallments/history' },

    ],
  },
  {
    title: 'Members',
    path: '/admin/members',
    icon: <Icon icon="fa-solid:users"  width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Block', path: '/admin/members/block' },
      { title: 'Edit', path: '/admin/members/edit' },
      { title: 'Income', path: '/admin/members/income' },
      { title: 'View Member', path: '/admin/members/view-member' },
    ],
  },
  {
    title: 'Packages',
    path: '/admin/packages',
    icon: <Icon  icon="tabler:packages" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Create', path: '/admin/packages/create' },
      { title: 'Edit', path: '/admin/packages/edit' },
    ],
  },
  {
    title: 'Payout',
    path: '/admin/payout',
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'History', path: '/admin/payout/history' },
      { title: 'Level Income', path: '/admin/payout/levelincome' },
  
    ],
  },
  {
    title: 'Reports',
    path: '/admin/reports',
    icon: <Icon icon="tabler:report"  width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: '5 Direct', path: '/admin/reports/5direct' },
      { title: '10 Direct', path: '/admin/reports/10direct' },
      { title: 'Custom Direct', path: '/admin/reports/customdirect' },
    ],
  },
  {
    title: 'Wallet',
    path: '/admin/wallet',
    icon: <Icon icon="heroicons:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Requests', path: '/admin/wallet/requests' },
    ],
  },
];
export const SIDENAV_ITEMS_USER: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Installments',
    path: '/admin/intallments',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Add', path: '/admin/intallments/add' },
      { title: 'History', path: '/admin/intallments/history' },

    ],
  },
  {
    title: 'Payout',
    path: '/admin/payout',
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'History', path: '/admin/payout/history' },
      { title: 'Level Income', path: '/admin/payout/levelincome' },
  
    ],
  },
];