import { PrismicText } from '@prismicio/react';

interface CaptionProps {
  caption: unknown;
}

export function Caption({ caption }: CaptionProps): JSX.Element {
  return (
    <p>
      <span className="my-4 inline-block text-base italic opacity-40">
        <PrismicText field={caption as never} />
      </span>
    </p>
  );
}
