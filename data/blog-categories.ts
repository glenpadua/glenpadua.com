import type { BlogCategory } from '@/types/content';

export const categories: BlogCategory[] = [
  {
    name: 'All',
    category: '',
    url: '/blog',
  },
  {
    name: 'Work',
    category: 'work',
    url: '/blog?category=work',
  },
  {
    name: 'Tech',
    category: 'tech',
    url: '/blog?category=tech',
  },
  {
    name: 'Chronicles of an Amputee',
    category: 'amputee',
    url: '/blog?category=amputee',
  },
];
