// src/app/admin/layout.tsx
import { ReactNode } from 'react';
import Header from '@/components/cards/header';
import MarginWidthWrapper from '@/components/cards/margin-width-wrapper';
import PageWrapper from '@/components/cards/page-wrapper';
import SideNav from '@/components/cards/side-nav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
