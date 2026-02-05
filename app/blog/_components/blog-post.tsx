'use client';

import { PrismicText } from '@prismicio/react';
import { SliceZone } from '@/app/blog/_components/slice-zone';
import { DisqusComments } from '@/app/blog/_components/disqus-comments';
import type { BlogPostDocument } from '@/types/content';

interface BlogPostProps {
  post: BlogPostDocument;
}

export function BlogPost({ post }: BlogPostProps): JSX.Element {
  const postData = post.data;
  const url = typeof window === 'undefined' ? '' : window.location.href;

  return (
    <article className="w-full max-w-[800px] leading-[1.5]">
      <h1 className="mb-8 text-center text-[2.5em] font-medium">
        <PrismicText field={postData.title as never} />
      </h1>

      {postData.show_cover_image && postData.cover_image?.url && (
        <div className="mb-8 flex w-full justify-center">
          <img
            src={postData.cover_image.url}
            alt={postData.cover_image.alt || 'Blog cover image'}
            className="h-auto max-h-[450px] max-w-full"
          />
        </div>
      )}

      <SliceZone body={postData.body} />
      <DisqusComments url={url} post={post} />
    </article>
  );
}
