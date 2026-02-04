import Layout from 'components/Layout';
import BlogPost from 'components/BlogPost';

export default function BlogPostPage({ post }) {
  return (
    <Layout>
      <div className="mt-[30px] flex w-full justify-center">
        <BlogPost post={post} />
      </div>
    </Layout>
  );
}
