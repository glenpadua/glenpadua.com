import { WorkRoom } from '@/features/diorama/rooms/work/work-room';
import { deskProjects } from '@/features/diorama/rooms/work/content';
export const metadata = {
  title: 'Work — at my desk',
  description:
    'Senior engineer at Remote.com. Earlier projects, current experiments, and a few too many tabs.',
};
export default function WorkPreview(): JSX.Element {
  return <WorkRoom projects={deskProjects} />;
}
