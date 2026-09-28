import { SliceZone as PrismicSliceZone } from '@prismicio/react';
import { components } from '@/app/blog/_components/slices';
import type { BlogSlice } from '@/types/content';

interface SliceZoneProps {
  body?: BlogSlice[];
}

export function SliceZone({ body = [] }: SliceZoneProps): JSX.Element {
  return (
    <PrismicSliceZone slices={body as never} components={components as never} />
  );
}
