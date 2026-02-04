import * as prismicH from '@prismicio/helpers';
import { format } from 'date-fns';
import BlogItem from 'components/BlogItem';

const PostList = ({ posts, category }) => {
  const postsByCategory = category
    ? posts.filter(post => post.data.category === category)
    : posts;

  return (
    <ul className="mt-5 flex w-full list-none flex-wrap justify-center">
      {postsByCategory.map(({ data, id, uid, first_publication_date }) => {
        const title = prismicH.asText(data.title);
        const published = format(new Date(first_publication_date), 'MMM d, yyyy');
        const preview = prismicH.asText(data.preview);

        return (
          <li key={id} className="my-2.5 w-full max-w-[800px]">
            <BlogItem
              uid={uid}
              title={title}
              published={published}
              preview={preview}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
