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
      { title: "Used", path: "/admin/epins/usedEpins" },
      { title: "Unused", path: "/admin/epins/unusedEpins" },
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
      { title: "View", path: "/admin/installments/history" },
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
      { title: "View Passwords", path: "/admin/members/retopup" },
      { title: "Edit Passwords", path: "/admin/members/retopup" },
    ],
  },
  {
    title: "Packages",
    path: "/admin/packages",
    icon: <Icon icon="tabler:packages" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View", path: "/admin/packages/edit" },
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
      { title: "Payout Details", path: "/admin/payout/history" },
    ],
  },
  {
    title: "Reports",
    path: "/admin/reports",
    icon: <Icon icon="tabler:report" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Directs", path: "/admin/reports/viewDirects" },
      { title: "View Re-topups", path: "/admin/reports/groups" },
      { title: "Epin History", path: "/admin/reports/epinHistory" },
      { title: "View Downline", path: "/admin/reports/viewMemberIncome" },
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
        path: "/admin/walletRequests/allRequests",
      },
      {
        title: "Wallet Details",
        path: "/admin/walletRequests/rejectedRequests",
      },
      {
        title: "Transaction Details",
        path: "/admin/walletRequests/rejectedRequests",
      },
    ],
  },
  {
    title: "Group",
    path: "/admin/wallet",
    icon: <Icon icon="heroicons:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View All Groups", path: "/admin/walletRequests/allRequests" },
      {
        title: "View All Members By Groups",
        path: "/admin/walletRequests/allRequests",
      },
      { title: "Add Groups", path: "/admin/walletRequests/allRequests" },
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
    path: "/user/intallments",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Profile", path: "/user/intallments/add" },
      { title: "Edit Profile", path: "/user/intallments/history" },
      { title: "Edit Password", path: "/user/intallments/history" },
    ],
  },
  {
    title: "Epin",
    path: "/user/intallments",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Used", path: "/user/intallments/history" },
      { title: "Unused", path: "/user/intallments/add" },
      { title: "History", path: "/user/intallments/history" },
    ],
  },
  {
    title: "My Team",
    path: "/user/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View All", path: "/user/payout/history" },
      { title: "View By Level", path: "/user/payout/levelincome" },
      { title: "Pay For Member", path: "/user/payout/history" },
    ],
  },
  {
    title: "Monthly Payout",
    path: "/user/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Renewal Income", path: "/user/payout/history" },
      { title: "View Level Income", path: "/user/payout/levelincome" },
    ],
  },
  {
    title: "Wallet",
    path: "/user/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Wallet Details", path: "/user/payout/levelincome" },
      { title: "Add Withdrawal Request", path: "/user/payout/history" },
      { title: "View Withdrawal Requests", path: "/user/payout/history" },
      { title: "View Transaction Details", path: "/user/payout/levelincome" },
    ],
  },
];
