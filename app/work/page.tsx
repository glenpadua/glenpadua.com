import { SiteLayout } from '@/app/components/layout/site-layout';
import { WorkContent } from '@/app/work/_components/work-content';

export const metadata = {
  title: 'Work',
};

export default function Page(): JSX.Element {
  return (
    <SiteLayout>
      <WorkContent />
    </SiteLayout>
  );
}
