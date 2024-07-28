'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';
import {
  SIDENAV_ITEMS_ADMIN,
  SIDENAV_ITEMS_USER,
} from '../utils/sidenavRoutes'; // Adjust the import path as needed
import { SideNavItem, Session } from '../utils/dtos';

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 20px 20px)`, // Adjust the position here
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 20px 20px)', // Adjust the position here
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [sideNavItems, setSideNavItems] = useState<SideNavItem[]>([]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      setSideNavItems(SIDENAV_ITEMS_ADMIN);
    } else if (session?.user?.role === 'user') {
      setSideNavItems(SIDENAV_ITEMS_USER);
    }
  }, [session]);

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        className={`fixed inset-0 z-50 w-full md:hidden ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 left-0 w-full bg-white"
          variants={sidebar}
        />
        <motion.ul
          variants={variants}
          className="absolute top-4 grid w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto"
        >
          {sideNavItems.map((item, idx) => {
            const isLastItem = idx === sideNavItems.length - 1; // Check if it's the last item

            return (
              <div key={idx}>
                {item.submenu ? (
                  <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
                ) : (
                  <MenuItem>
                    <Link
                      href={item.path}
                      onClick={() => toggleOpen()}
                      className={`flex w-full text-2xl ${
                        item.path === pathname ? 'font-bold' : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  </MenuItem>
                )}

                {!isLastItem && (
                  <MenuItem className="my-3 h-px w-full bg-gray-300" />
                )}
              </div>
            );
          })}
        </motion.ul>
        <MenuToggle toggle={toggleOpen} />
      </motion.nav>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-md md:hidden" style={{ padding: '1.375rem' }}>
      <MenuToggle toggle={toggleOpen} />
        <Link href="/signout" className="flex items-center space-x-2 ml-auto">
          <Icon icon="mdi:power" width="24" height="24" />
          <span>Sign Out</span>
        </Link>
      </div>
    </>
  );
};

export default HeaderMobile;

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute left-4 top-4 z-30" // Adjust the position here
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className="flex w-full text-2xl"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex flex-row justify-between w-full items-center">
            <span
              className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}
            >
              {item.title}
            </span>
            <div className={`${subMenuOpen && 'rotate-180'}`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </div>
        </button>
      </MenuItem>
      <div className="mt-2 ml-2 flex flex-col space-y-2">
        {subMenuOpen && (
          <>
            {item.subMenuItems?.map((subItem, subIdx) => {
              return (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={() => toggleOpen()}
                    className={` ${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
