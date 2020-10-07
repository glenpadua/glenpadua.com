import { DiscussionEmbed } from 'disqus-react';
import { RichText } from 'prismic-reactjs';

const DisqusComments = ({ post, url }) => {
  console.log(url);
  const disqusShortname = 'glenpadua-1';
  const disqusConfig = {
    url: url,
    identifier: post._meta.id, // Single post id
    title: RichText.asText(post.title), // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
