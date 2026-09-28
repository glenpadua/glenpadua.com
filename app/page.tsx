import { WorldJourney } from '@/features/diorama/screens/world-journey';
import { worldScenes } from '@/features/diorama/data/scenes';
import { pageMetadata } from '@/features/diorama/lib/metadata';
import { site, socialLinks } from '@/features/diorama/data/site';

export const metadata = pageMetadata({
  title: site.title,
  absoluteTitle: true,
  description: site.description,
  path: '/',
});

// Who this is, for search engines: plain facts only.
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: `${site.url}${site.image.url}`,
  jobTitle: 'Senior Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Remote',
    url: 'https://remote.com',
  },
  sameAs: [
    socialLinks.github,
    socialLinks.twitter,
    socialLinks.instagram,
    'https://www.linkedin.com/in/glen-padua/',
  ],
};

export default function Home(): JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <WorldJourney scenes={worldScenes} />
    </>
  );
}
