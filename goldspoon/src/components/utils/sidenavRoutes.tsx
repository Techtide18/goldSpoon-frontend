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
      { title: "Re-topup", path: "/admin/epins/retopup" },
      { title: "Transfer", path: "/admin/epins/transfer" },
    ],
  },
  {
    title: "Installments",
    path: "/admin/intallments",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add", path: "/admin/installments/add" },
      { title: "History", path: "/admin/installments/history" },
    ],
  },
  {
    title: "Members",
    path: "/admin/members",
    icon: <Icon icon="fa-solid:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Block", path: "/admin/members/block" },
      { title: "Edit", path: "/admin/members/edit" },
    ],
  },
  {
    title: "Packages",
    path: "/admin/packages",
    icon: <Icon icon="tabler:packages" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
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
      { title: "History", path: "/admin/payout/history" },
      {
        title: "Generate Level Income",
        path: "/admin/payout/generateLevelIncome",
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
      { title: "View Members", path: "/admin/reports/viewMembers" },
      { title: "View Member Income", path: "/admin/reports/viewMemberIncome" },
      { title: "Used Epins", path: "/admin/reports/usedEpins" },
      { title: "Unused Epins", path: "/admin/reports/unusedEpins" },
      { title: "Epin History", path: "/admin/reports/epinHistory" },
    ],
  },
  {
    title: "Wallet Requests",
    path: "/admin/wallet",
    icon: <Icon icon="heroicons:wallet" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View All", path: "/admin/walletRequests/allRequests" },
      { title: "Pending", path: "/admin/walletRequests/pendingRequests" },
      { title: "Approved", path: "/admin/walletRequests/approvedRequests" },
      { title: "Rejected", path: "/admin/walletRequests/rejectedRequests" },
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
    title: "Installments",
    path: "/user/intallments",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add", path: "/user/intallments/add" },
      { title: "History", path: "/user/intallments/history" },
    ],
  },
  {
    title: "Payout",
    path: "/user/payout",
    icon: <Icon icon="mingcute:card-pay-fill" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "History", path: "/user/payout/history" },
      { title: "Level Income", path: "/user/payout/levelincome" },
    ],
  },
];
