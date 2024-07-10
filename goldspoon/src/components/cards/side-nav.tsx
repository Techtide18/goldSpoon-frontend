"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS_ADMIN } from "../utils/sidenavRoutes";
import { SideNavItem } from "../utils/dtos";
import { Icon } from "@iconify/react";

const SideNav = () => {
  return (
    <div className="md:w-72 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex overflow-y-auto">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-16 w-full"
        >
          <span className="h-10 w-10 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-2xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS_ADMIN.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

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

            <div className={`${subMenuOpen ? "rotate-180" : ""} transition-transform`}>
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
