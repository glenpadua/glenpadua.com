import { Suspense } from 'react';
import { PrismicPreview } from '@prismicio/next';
import AnalyticsTracker from 'components/AnalyticsTracker';
import StyledComponentsRegistry from 'lib/styled-components-registry';
import { repositoryName } from 'prismicio';
import './globals.css';

export const metadata = {
  title: {
    default: 'Glen Padua',
    template: '%s | Glen Padua',
  },
  description: 'Everything you need to know about me. Built with Next.js and Prismic.',
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
