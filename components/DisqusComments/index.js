import { DiscussionEmbed } from 'disqus-react';
import * as prismicH from '@prismicio/helpers';

const DisqusComments = ({ post, url }) => {
  const disqusShortname = 'glenpadua';
  const disqusConfig = {
    url: url,
    identifier: post._meta.id, // Single post id
    title: prismicH.asText(post.title), // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
