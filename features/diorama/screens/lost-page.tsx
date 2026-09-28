import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { worldRoutes } from '../lib/routes';

/** The site's not-found page: a note left on the desk, with ways back. */
export function LostPage(): JSX.Element {
  return (
    <main id="world-main" tabIndex={-1} className="world-lost">
      <div className="world-lost-note">
        <p className="world-lost-code">404</p>
        <h1>This page wandered off.</h1>
        <p>
          It may have moved when the site was redrawn, or it never existed. The
          rest of the day is still here.
        </p>
        <ul>
          <li>
            <Link href={worldRoutes.home}>
              Start at the lake <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href={worldRoutes.writing}>
              Read something I wrote <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href={worldRoutes.work}>
              See what I’m working on{' '}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
