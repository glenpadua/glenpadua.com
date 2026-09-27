import { WorkRoom } from '@/features/diorama/rooms/work/work-room';
import { deskFiles, deskNotes } from '@/features/diorama/rooms/work/content';
export const metadata = {
  title: 'Work — at my desk',
  description:
    'Senior engineer at Remote.com. A few things I’ve built, client work from my studio years, and what’s on the desk now.',
};
export default function WorkPreview(): JSX.Element {
  return <WorkRoom files={deskFiles} notes={deskNotes} />;
}
