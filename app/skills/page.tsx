import { SiteLayout } from '@/app/components/layout/site-layout';
import { SkillsContent } from '@/app/skills/_components/skills-content';

export const metadata = {
  title: 'Skills',
};

export default function Page(): JSX.Element {
  return (
    <SiteLayout>
      <SkillsContent />
    </SiteLayout>
  );
}
