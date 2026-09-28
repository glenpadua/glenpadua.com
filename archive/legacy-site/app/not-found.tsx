import { SiteLayout } from '@/app/components/layout/site-layout';
import { PageTitle } from '@/app/components/layout/page-title';

export const metadata = {
  title: 'Not Found',
};

export default function NotFound(): JSX.Element {
  return (
    <SiteLayout>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <PageTitle>Page Not Found</PageTitle>
      </div>
    </SiteLayout>
  );
}
