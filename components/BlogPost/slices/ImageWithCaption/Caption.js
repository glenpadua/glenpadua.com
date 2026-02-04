import { PrismicText } from '@prismicio/react';

const Caption = ({ caption }) => {
  return (
    <p>
      <span className="my-4 inline-block text-base italic opacity-40">
        <PrismicText field={caption} />
      </span>
    </p>
  );
};

export default Caption;
