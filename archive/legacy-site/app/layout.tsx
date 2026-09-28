import { Suspense } from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PrismicPreview } from '@prismicio/next';
import { AnalyticsTracker } from '@/app/components/analytics/analytics-tracker';
import { repositoryName } from '@/lib/prismic';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Glen Padua',
    template: '%s | Glen Padua',
  },
  description:
    'Everything you need to know about me. Built with Next.js and Prismic.',
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f2f4f8] text-foreground antialiased">
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
