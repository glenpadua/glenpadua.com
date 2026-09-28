import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { WorldLayout } from '@/features/diorama/world-layout';
import { site } from '@/features/diorama/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
};

export const viewport: Viewport = {
  themeColor: '#2f4a3e',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <WorldLayout>{children}</WorldLayout>
      </body>
    </html>
  );
}
