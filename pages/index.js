import Layout from 'components/Layout';
import Link from 'next/link';
import Head from 'next/head';

const PostLink = props => (
  <li>
    <Link href="/posts/[id]" as={`/posts/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <h1>Hi I'm Glen!</h1>
        <ul>
          <PostLink id="hello-nextjs" />
          <PostLink id="learn-nextjs" />
          <PostLink id="deploy-nextjs" />
        </ul>
      </Layout>
    </>
  );
}
