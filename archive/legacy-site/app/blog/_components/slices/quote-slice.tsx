import { PrismicText } from '@prismicio/react';
import type { BlogSlice } from '@/types/content';

interface QuoteSliceProps {
  slice: BlogSlice;
}

export function QuoteSlice({ slice }: QuoteSliceProps): JSX.Element {
  const primary = slice.primary as { quote?: unknown };

  return (
    <blockquote className="relative my-12 w-full bg-[#ededed] py-5 pl-[75px] pr-[30px] text-[1.2em] italic leading-[1.6] text-[#555555]">
      <span className="absolute left-2.5 top-[-10px] font-sans text-[3em] text-[#78c0a8]">
        {'\u201C'}
      </span>
      <span className="border-l-[8px] border-[#78c0a8] pl-4">
        <PrismicText field={primary.quote as never} />
      </span>
    </blockquote>
  );
}
