export interface DeskArticle {
  uid: string;
  title: string;
  category: string;
  date: string;
  note: string;
}
// Verified against public Prismic on 2026-09-26; server fetch includes future posts.
export const deskArticles: readonly DeskArticle[] = [
  {
    uid: 'lottery-of-birth',
    title: 'The Lottery of Birth',
    category: 'Life',
    date: '2020-04-09',
    note: 'Chronicles of an Amputee · 01',
  },
  {
    uid: 'bone-to-be-wild',
    title: 'Bone to be Wild',
    category: 'Life',
    date: '2020-05-14',
    note: 'Chronicles of an Amputee · 05',
  },
  {
    uid: 'the-russian-connection',
    title: 'The Russian Connection',
    category: 'Life',
    date: '2020-04-18',
    note: 'Chronicles of an Amputee · 02',
  },
  {
    uid: 'do-you-have-an-ideal-dream-job',
    title: 'Do you have an ideal dream job?',
    category: 'Work & life',
    date: '2022-07-12',
    note: 'Time. Money. Health. Happiness.',
  },
  {
    uid: 'lord-of-the-rings',
    title: 'Lord of the Rings',
    category: 'Life',
    date: '2020-04-24',
    note: 'Chronicles of an Amputee · 03',
  },
  {
    uid: 'bones-that-got-away',
    title: 'The B’ones That Got Away',
    category: 'Life',
    date: '2020-05-02',
    note: 'Chronicles of an Amputee · 04',
  },
  {
    uid: 'back-to-school',
    title: 'Back to School',
    category: 'Life',
    date: '2020-06-03',
    note: 'Chronicles of an Amputee · 06',
  },
  {
    uid: 'free-space-npkill',
    title: 'Free up space with npkill',
    category: 'Code',
    date: '2022-05-05',
    note: 'A little more room on your drive.',
  },
];
