import type { CSSProperties } from 'react';
/** Single cover selection for Stories and the reader. See docs/art-style.md. */
export interface ArticleCover {
  src: string;
  thumbnailSrc: string;
  width: number;
  height: number;
  position: string;
  thumbnailPosition: string;
  alt: string;
}

/**
 * The desk paper and the article share one view-transition name, so a full
 * page load morphs the cover between them (`shared/page-transitions.css`).
 */
export function coverTransition(uid: string): CSSProperties {
  return {
    viewTransitionName: `cover-${uid.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`,
    viewTransitionClass: 'story-cover',
  } as CSSProperties;
}

export const coverProvenance = {
  styleGuide: 'docs/art-style.md',
  styleRevision: 'illustrated-world-v1',
  treatment: 'bespoke-generated-illustration',
  sourceManifest: 'docs/article-covers.json',
} as const;

const cover = (
  uid: string,
  alt: string,
  thumbnailPosition = '50% 75%',
): ArticleCover => ({
  src: `/assets/world/articles/${uid}-v1.webp`,
  thumbnailSrc: `/assets/world/articles/${uid}-v1-600.webp`,
  width: 1536,
  height: 768,
  position: '50% 50%',
  thumbnailPosition,
  alt,
});

export const articleCovers: Readonly<Record<string, ArticleCover>> = {
  'lottery-of-birth': cover(
    'lottery-of-birth',
    'A young boy considers the cards in his hands in a sunlit room.',
  ),
  'the-russian-connection': cover(
    'the-russian-connection',
    'An imagined dinosaur doctor explains a bone model in a simple sunlit room.',
    '50% 60%',
  ),
  'lord-of-the-rings': cover(
    'lord-of-the-rings',
    'A model of an orthopedic ring frame beside a game controller and school notebook.',
  ),
  'bones-that-got-away': cover(
    'bones-that-got-away',
    'Two puzzle pieces that cannot fit, beside a small birthday cake.',
  ),
  'bone-to-be-wild': cover(
    'bone-to-be-wild',
    'Child-sized and adult shoes share a doorway beneath a doctor’s coat.',
  ),
  'back-to-school': cover(
    'back-to-school',
    'A boy with a backpack and leg calliper enters a sunlit classroom.',
    '50% 70%',
  ),
  'do-you-have-an-ideal-dream-job': cover(
    'do-you-have-an-ideal-dream-job',
    'Glen works on a laptop beside a turquoise pool in Bali.',
  ),
  'free-space-npkill': cover(
    'free-space-npkill',
    'Folders and a small brush beside a laptop evoke clearing away old projects.',
  ),
};

// Future posts have a complete illustration until their bespoke cover is ready.
export const defaultArticleCover: ArticleCover = {
  src: '/assets/world/writing.webp',
  thumbnailSrc: '/assets/world/writing-900.webp',
  width: 1536,
  height: 1024,
  position: '50% 50%',
  thumbnailPosition: '50% 50%',
  alt: '',
};

export function getArticleCover(uid: string): ArticleCover {
  return Object.hasOwn(articleCovers, uid)
    ? articleCovers[uid]
    : defaultArticleCover;
}
