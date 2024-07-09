"use client";
import Link from "next/link";
import {
  Bell,
  Package2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { SIDENAV_ITEMS_USER } from "../utils/constants";
import { SIDENAV_ITEMS_ADMIN } from "../utils/constants";
import { SideNavItem } from "@/components/utils/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default  function SideNav2() {
  
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-[#141417] md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[47px] items-center border-b px-4">
            <Link href="/" className="flex items-center text-[#fafafa] gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">GoldSpoon</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-[#fafafa] text-sm font-medium lg:px-4">
              {SIDENAV_ITEMS_ADMIN.map((item, idx) => {
                return <MenuItem key={idx} item={item} />;
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <div
            //   href="#"
            onClick={toggleSubMenu}
            className={`flex items-center gap-3 rounded-lg px-3 py-2  justify-between transition-all hover:text-[#8f8f97] ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <Link
              href="#"
              className="flex items-center space-x-3 gap-3 rounded-lg  transition-all hover:text-[#8f8f97]"
            >
              {item.icon}
              {item.title}
            </Link>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </div>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`flex items-center  gap-3 rounded-lg text-white-300 transition-all hover:text-[#8f8f97]${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    {subItem.title}
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-[#8f8f97]${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          {item.title}
        </Link>
      )}
    </div>
  );
};
