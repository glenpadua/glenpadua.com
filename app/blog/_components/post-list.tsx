import * as prismicH from '@prismicio/helpers';
import { format } from 'date-fns';
import { BlogItem } from '@/app/blog/_components/blog-item';
import type { BlogPostDocument } from '@/types/content';

interface PostListProps {
  posts: BlogPostDocument[];
  category: string;
}

export function PostList({ posts, category }: PostListProps): JSX.Element {
  const postsByCategory = category
    ? posts.filter(post => post.data.category === category)
    : posts;

  return (
    <ul className="mt-5 flex w-full list-none flex-wrap justify-center">
      {postsByCategory.map(({ data, id, uid, first_publication_date }) => {
        const title = prismicH.asText(data.title as never) || '';
        const published = format(
          new Date(first_publication_date),
          'MMM d, yyyy',
        );
        const preview = prismicH.asText((data.preview ?? null) as never) || '';

        return (
          <li key={id} className="my-2.5 w-full max-w-[800px]">
            <BlogItem
              uid={uid || ''}
              title={title}
              published={published}
              preview={preview}
            />
          </li>
        );
      })}
    </ul>
  );
}
