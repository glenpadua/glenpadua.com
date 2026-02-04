import React from 'react';
import { SliceZone as PrismicSliceZone } from '@prismicio/react';
import { components } from './slices';

const SliceZone = ({ body = [] }) => (
  <PrismicSliceZone slices={body} components={components} />
);

export default SliceZone;
