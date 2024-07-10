export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type Session = {
  user: {
    id: string;
    name: string;
    memberNumber: string;
    role: string;
  };
};
