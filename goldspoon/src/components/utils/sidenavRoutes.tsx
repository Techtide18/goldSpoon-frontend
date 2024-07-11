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
      { title: "History", path: "/admin/installments/history" },
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
    ],
  },
  {
    title: "Packages",
    path: "/admin/packages",
    icon: <Icon icon="tabler:packages" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Create", path: "/admin/packages/create" },
      { title: "View & Edit", path: "/admin/packages/edit" },
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
        title: "Generate Payout",
        path: "/admin/payout/generatePayout",
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
      { title: "View Groups", path: "/admin/reports/groups" },
      { title: "Epin History", path: "/admin/reports/epinHistory" },
      { title: "View Member Income", path: "/admin/reports/viewMemberIncome" },
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
