//USER LAYOUT

import { ReactNode } from 'react';
import Header from '@/components/cards/header';
import MarginWidthWrapper from '@/components/cards/margin-width-wrapper';
import PageWrapper from '@/components/cards/page-wrapper';
import SideNav from '@/components/cards/side-nav';
import { auth } from '@/auth'; // Adjust the import path as needed

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="flex">
      <SideNav session={session} />
      <main className="flex-1 ml-12">
        <MarginWidthWrapper>
          <Header />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
