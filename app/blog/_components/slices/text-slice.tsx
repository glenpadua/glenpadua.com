import { PrismicRichText } from '@prismicio/react';
import type { BlogSlice } from '@/types/content';

interface TextSliceProps {
  slice: BlogSlice;
}

export function TextSlice({ slice }: TextSliceProps): JSX.Element {
  const primary = slice.primary as { text?: unknown };

  return (
    <div className="self-start text-base font-light leading-[1.5]">
      <PrismicRichText
        field={primary.text as never}
        components={{
          heading2: ({ children }) => (
            <h2 className="mb-4 text-[1.8em] font-medium">{children}</h2>
          ),
          heading3: ({ children }) => (
            <h3 className="mb-3 text-[1.5em] font-normal">{children}</h3>
          ),
          paragraph: ({ children }) => <p className="mb-8">{children}</p>,
          preformatted: ({ children }) => (
            <pre className="my-4 rounded bg-[#1d2230] px-3 py-2.5 font-mono text-[13px] leading-6 text-white">
              {children}
            </pre>
          ),
          list: ({ children }) => (
            <ul className="mb-8 ml-8 list-disc space-y-1">{children}</ul>
          ),
          strong: ({ children }) => (
            <strong className="font-normal">{children}</strong>
          ),
        }}
      />
    </div>
  );
}
