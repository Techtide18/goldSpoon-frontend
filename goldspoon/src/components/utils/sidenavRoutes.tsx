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
    icon: <Icon icon="lucide:shopping-cart" width="24" height="24" />,
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
    icon: <Icon icon="mingcute:card-pay-line" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add", path: "/admin/installments/add" },
      // { title: "Edit", path: "/admin/installments/edit" },
      { title: "View", path: "/admin/installments/view" },
      // { title: "Remove", path: "/admin/installments/remove" },
    ],
  },
  {
    title: "Members",
    path: "/admin/members",
    icon: <Icon icon="lucide:book-user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View", path: "/admin/members/view" },
      { title: "Edit", path: "/admin/members/edit" },
      { title: "Block", path: "/admin/members/block" },
      { title: "Unblock", path: "/admin/members/unblock" },
      { title: "Re-topup", path: "/admin/members/retopup" },
      { title: "View Passwords", path: "/admin/members/viewPassword" },
      { title: "Edit Passwords", path: "/admin/members/editPassword" },
    ],
  },
  {
    title: "Packages",
    path: "/admin/packages",
    icon: <Icon icon="lucide:blocks" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View", path: "/admin/packages/view" },
      { title: "Create", path: "/admin/packages/create" },
      { title: "Edit", path: "/admin/packages/edit" },
    ],
  },
  {
    title: "Groups",
    path: "/admin/group",
    icon: <Icon icon="lucide:users-round" width="24" height="24" />,
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
  {
    title: "Payout",
    path: "/admin/payout",
    icon: <Icon icon="lucide:badge-indian-rupee" width="24" height="24" />,
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
    title: "Wallet",
    path: "/admin/wallet",
    icon: <Icon icon="lucide:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Withdrawal Requests",
        path: "/admin/wallet/withdrawalRequests",
      },
      {
        title: "Add Transaction",
        path: "/admin/wallet/addTransaction",
      },
      {
        title: "View Transaction Details",
        path: "/admin/wallet/transactionDetails",
      },
      {
        title: "View Wallet Details",
        path: "/admin/wallet/walletDetails",
      },
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
];

export const SIDENAV_ITEMS_USER: SideNavItem[] = [
  {
    title: "Home",
    path: "/user",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "My Epin",
    path: "/user/myEpin",
    icon: <Icon icon="lucide:notebook" width="24" height="24" />,
    submenu: false,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <Icon icon="lucide:user-round-pen" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Profile", path: "/user/profile/view" },
      { title: "Edit Profile", path: "/user/profile/editProfile" },
      { title: "Edit Password", path: "/user/profile/editPassword" },
    ],
  },
  {
    title: "E-Pins",
    path: "/user/epins",
    icon: <Icon icon="lucide:shopping-cart" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "My Re-topups", path: "/user/epins/myRetopups" },
      { title: "Used", path: "/user/epins/used" },
      { title: "Unused", path: "/user/epins/unused" },
    ],
  },
  {
    title: "Payout Details",
    path: "/user/payoutDetails",
    icon: <Icon icon="lucide:badge-indian-rupee" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "View Renewal Income",
        path: "/user/payoutDetails/renewalIncome",
      },
      { title: "View Level Income", path: "/user/payoutDetails/levelIncome" },
    ],
  },
  {
    title: "Installments",
    path: "/user/installments",
    icon: <Icon icon="mingcute:card-pay-line" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "My Installments", path: "/user/installments/myInstallments" },
      {
        title: "Direct Team's Installments",
        path: "/user/installments/myTeam",
      },
    ],
  },
  {
    title: "My Team",
    path: "/user/myTeam",
    icon: <Icon icon="lucide:users-round" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View All", path: "/user/myTeam/byAll" },
      { title: "View Count", path: "/user/myTeam/byCount" },
      { title: "Pay For Member", path: "/user/myTeam/pay" },
    ],
  },
  {
    title: "Wallet",
    path: "/user/wallet",
    icon: <Icon icon="lucide:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Wallet Details", path: "/user/wallet/walletDetails" },
      { title: "Add Withdrawal Request", path: "/user/wallet/addWithdrawal" },
      { title: "View Withdrawal Requests", path: "/user/wallet/withdrawals" },
      { title: "View Transaction Details", path: "/user/wallet/transactions" },
    ],
  },
];
