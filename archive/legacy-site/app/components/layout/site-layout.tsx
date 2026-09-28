import type { ReactNode } from 'react';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps): JSX.Element {
  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-5 py-5 lg:px-10">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
