import { PrismicText } from '@prismicio/react';

const Quote = ({ slice }) => (
  <blockquote className="relative my-12 w-full bg-[#ededed] py-5 pl-[75px] pr-[30px] text-[1.2em] italic leading-[1.6] text-[#555555]">
    <span className="absolute left-2.5 top-[-10px] font-sans text-[3em] text-[#78c0a8]">
      {'\u201C'}
    </span>
    <span className="border-l-[8px] border-[#78c0a8] pl-4">
      <PrismicText field={slice.primary.quote} />
    </span>
  </blockquote>
);

export default Quote;
