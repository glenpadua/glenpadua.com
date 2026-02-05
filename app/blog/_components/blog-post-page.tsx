import { BlogPost } from '@/app/blog/_components/blog-post';
import type { BlogPostDocument } from '@/types/content';

interface BlogPostPageProps {
  post: BlogPostDocument;
}

export function BlogPostPage({ post }: BlogPostPageProps): JSX.Element {
  return (
    <div className="mt-[30px] flex w-full justify-center">
      <BlogPost post={post} />
    </div>
  );
}
