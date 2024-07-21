"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SIDENAV_ITEMS_ADMIN,
  SIDENAV_ITEMS_USER,
} from "../utils/sidenavRoutes";
import { SideNavItem, Session } from "../utils/dtos";
import { Icon } from "@iconify/react";

const SideNav = ({ session }: { session: Session }) => {
  const [sideNavItems, setSideNavItems] = useState<SideNavItem[]>([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      setSideNavItems(SIDENAV_ITEMS_ADMIN);
    } else if (session?.user?.role === "user") {
      setSideNavItems(SIDENAV_ITEMS_USER);
    }
  }, [session]);

  return (
    <div className="md:w-72 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex overflow-y-auto">
      <div className="flex flex-col w-full h-full"> 
        {/* yellow-100 */}
        <div className="fixed top-0 left-0 w-72 bg-white z-10 border-b border-zinc-200"> 
          <div className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 h-16 w-full">
            <div className="flex items-center space-x-4">
              <img
                src="https://goldspoon.co.in/template/images/logo.svg"
                alt="Logo"
                className="h-10 w-10"
              />
              <span className="font-bold text-xl hidden md:flex">
                {session?.user?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-16 pt-6 md:px-6 flex-1 pb-4">
          {sideNavItems.length > 0 &&
            sideNavItems.map((item, idx) => <MenuItem key={idx} item={item} />)}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="flex flex-col">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-lg">{item.title}</span>
            </div>

            <div
              className={`${
                subMenuOpen ? "rotate-180" : ""
              } transition-transform`}
            >
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-8 flex flex-col space-y-2">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`pl-2 ${
                    subItem.path === pathname ? "font-bold" : "font-medium"
                  } hover:underline`}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-lg">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

export default SideNav;
