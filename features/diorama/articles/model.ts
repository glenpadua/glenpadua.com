import type { ImageField, RichTextField } from '@prismicio/client';

export type ArticleSlice =
  | { id: string; slice_type: 'text'; primary: { text: RichTextField } }
  | { id: string; slice_type: 'quote'; primary: { quote: RichTextField } }
  | {
      id: string;
      slice_type: 'image_with_caption';
      primary: { image: ImageField; caption: RichTextField };
    };

export interface Article {
  id: string;
  uid: string;
  title: string;
  description: string;
  date: string;
  category: string;
  body: ArticleSlice[];
}
