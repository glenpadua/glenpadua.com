'use client';

import { useEffect, useState } from 'react';
import { PrismicText } from '@prismicio/react';
import SliceZone from './SliceZone';
import DisqusComments from 'components/DisqusComments';

const BlogPost = ({ post }) => {
  const [url, setUrl] = useState('');
  const postData = post.data;

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <article className="w-full max-w-[800px] leading-[1.5]">
      <h1 className="mb-8 text-center text-[2.5em] font-medium">
        <PrismicText field={postData.title} />
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
};

export default BlogPost;
