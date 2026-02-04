import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';

export const metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <Layout>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <PageTitle>Page Not Found</PageTitle>
      </div>
    </Layout>
  );
}
