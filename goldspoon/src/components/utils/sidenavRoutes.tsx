import { Icon } from "@iconify/react";

import { SideNavItem } from "./dtos";

export const SIDENAV_ITEMS_ADMIN: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "E-Pins",
    path: "/admin/epins",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Generate", path: "/admin/epins/generate" },
      { title: "Used", path: "/admin/epins/used" },
      { title: "Unused", path: "/admin/epins/unused" },
    ],
  },
  {
    title: "Installments",
    path: "/admin/intallments",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add", path: "/admin/installments/add" },
      { title: "Edit", path: "/admin/installments/edit" },
      { title: "View", path: "/admin/installments/view" },
    ],
  },
  {
    title: "Members",
    path: "/admin/members",
    icon: <Icon icon="fa-solid:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View", path: "/admin/members/view" },
      { title: "Edit", path: "/admin/members/edit" },
      { title: "Block", path: "/admin/members/block" },
      { title: "Re-topup", path: "/admin/members/retopup" },
      { title: "View Passwords", path: "/admin/members/viewPassword" },
      { title: "Edit Passwords", path: "/admin/members/editPassword" },
    ],
  },
  {
    title: "Packages",
    path: "/admin/packages",
    icon: <Icon icon="tabler:packages" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View", path: "/admin/packages/view" },
      { title: "Create", path: "/admin/packages/create" },
      { title: "Edit", path: "/admin/packages/edit" },
    ],
  },
  {
    title: "Payout",
    path: "/admin/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Generate Payout",
        path: "/admin/payout/generatePayout",
      },
      {
        title: "View Monthly Payout Details",
        path: "/admin/payout/payoutDetails",
      },
      { title: "View Level Income", path: "/admin/payout/levelIncome" },
      { title: "View Renewal Income", path: "/admin/payout/renewalIncome" },
    ],
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: <Icon icon="tabler:report" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Directs", path: "/admin/reports/viewDirects" },
      { title: "View Re-topups", path: "/admin/reports/viewRetopups" },
      { title: "View Downline", path: "/admin/reports/downline" },
    ],
  },
  {
    title: "Wallet",
    path: "/admin/wallet",
    icon: <Icon icon="heroicons:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Withdrawal Requests",
        path: "/admin/wallet/withdrawalRequests",
      },
      {
        title: "Wallet Details",
        path: "/admin/wallet/walletDetails",
      },
      {
        title: "Transaction Details",
        path: "/admin/wallet/transactionDetails",
      },
    ],
  },
  {
    title: "Group",
    path: "/admin/group",
    icon: <Icon icon="heroicons:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add", path: "/admin/group/add" },
      { title: "View Groups", path: "/admin/group/allGroups" },
      {
        title: "View All Members In Group",
        path: "/admin/group/allMembers",
      },
    ],
  },
];

export const SIDENAV_ITEMS_USER: SideNavItem[] = [
  {
    title: "Home",
    path: "/user",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Profile", path: "/user/profile/view" },
      { title: "Edit Profile", path: "/user/profile/editProfile" },
      { title: "Edit Password", path: "/user/profile/editPassword" },
    ],
  },
  {
    title: "E-Pins",
    path: "/user/epin",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Used", path: "/user/epin/used" },
      { title: "Unused", path: "/user/epin/unused" },
      { title: "History", path: "/user/epin/history" },
    ],
  },
  {
    title: "My Team",
    path: "/user/myTeam",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View All", path: "/user/myTeam/byAll" },
      { title: "View By Level", path: "/user/myTeam/byLevel" },
      { title: "Pay For Member", path: "/user/myTeam/pay" },
    ],
  },
  {
    title: "Monthly Payout",
    path: "/user/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Renewal Income", path: "/user/payout/renewalIncome" },
      { title: "View Level Income", path: "/user/payout/levelIncome" },
    ],
  },
  {
    title: "Wallet",
    path: "/user/wallet",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Wallet Details", path: "/user/wallet/walletDetails" },
      { title: "Add Withdrawal Request", path: "/user/wallet/addWithdrawal" },
      { title: "View Withdrawal Requests", path: "/user/wallet/withdrawals" },
      { title: "View Transaction Details", path: "/user/wallet/transactions" },
    ],
  },
];
