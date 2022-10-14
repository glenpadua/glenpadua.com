import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import Link from 'next/link';
import { repositoryName } from '../prismicio';

import './index.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}
