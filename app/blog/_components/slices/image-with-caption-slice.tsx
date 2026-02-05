import { Caption } from '@/app/blog/_components/slices/caption';
import type { BlogSlice } from '@/types/content';

interface ImageWithCaptionSliceProps {
  slice: BlogSlice;
}

export function ImageWithCaptionSlice({
  slice,
}: ImageWithCaptionSliceProps): JSX.Element {
  const primary = slice.primary as {
    image?: {
      url?: string | null;
      alt?: string | null;
    };
    caption?: unknown;
  };

  const imageUrl = primary.image?.url;
  const imageAlt = primary.image?.alt;
  const caption = primary.caption;

  return (
    <div className="mt-8 flex flex-col items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt || 'Post image'}
          className="h-auto max-h-[500px] max-w-full"
        />
      ) : null}
      <Caption caption={caption} />
    </div>
  );
}
