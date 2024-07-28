"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/app/hooks/useScroll";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b`,
        {
          "bg-white/75 backdrop-blur-lg": scrolled, //yellow-100
          "bg-white": selectedLayout || !scrolled, //yellow-100
        }
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/signout" 
            className="flex items-center space-x-2"
          >
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-center shadow-md transform transition-transform duration-200 hover:translate-x-[-8px] hover:shadow-lg">
              <Icon
                icon="mdi:power"
                width="24"
                height="24"
                className="text-gray-800"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
