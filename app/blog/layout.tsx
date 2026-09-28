import type { ReactNode } from 'react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/lib/prismic';

/** Prismic's preview toolbar is only needed where drafts can be read. */
export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      {children}
      <PrismicPreview repositoryName={repositoryName} />
    </>
  );
}
