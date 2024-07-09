//USER LAYOUT

import { ReactNode } from 'react';
import Header from '@/components/cards/header';
import MarginWidthWrapper from '@/components/cards/margin-width-wrapper';
import PageWrapper from '@/components/cards/page-wrapper';
import SideNav from '@/components/cards/side-nav';
import  SideNav2 from '@/components/cards/side-nav2';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideNav2 />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
