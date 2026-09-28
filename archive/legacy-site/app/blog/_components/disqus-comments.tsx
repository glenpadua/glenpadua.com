'use client';

import { DiscussionEmbed } from 'disqus-react';
import * as prismicH from '@prismicio/helpers';
import type { BlogPostDocument } from '@/types/content';

interface DisqusCommentsProps {
  post: BlogPostDocument;
  url: string;
}

export function DisqusComments({
  post,
  url,
}: DisqusCommentsProps): JSX.Element {
  const disqusShortname = 'glenpadua';
  const disqusConfig = {
    url,
    identifier: post.id,
    title: prismicH.asText(post.data?.title as never) || '',
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
