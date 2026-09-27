import type { WorldScene } from '../../model/types';
import { lakeHorizonMask } from './horizon';
export const lakeScene: WorldScene = {
  id: 'lake',
  name: 'Lake',
  eyebrow: 'Glen Padua. In his natural habitat.',
  title: ['Skipping leg day', 'since 2008.'],
  body: ['I’m Glen. That’s me on the bar.', 'The tiny version, anyway.'],
  description:
    'Glen holds a pull-up by a green mountain lake, in a sage exercise tank and dark shorts. His left leg is a prosthesis.',
  sky: '#d7e9e9',
  skyTime: 0,
  sunrise: { x: 84, y: 53.2 },
  mobile: { width: 210, left: -88 },
  layers: [
    {
      id: 'back',
      asset: 'lake-back',
      depth: 0.16,
      responsive: true,
      mask: lakeHorizonMask,
    },
    {
      id: 'character',
      asset: 'lake-character',
      depth: 0.65,
      x: 68,
      y: 52,
      width: 18,
    },
    { id: 'grass', asset: 'grass', depth: 1 },
  ],
  hotspots: [
    {
      id: 'exercise',
      label: 'The non-pixel version',
      href: 'https://www.instagram.com/glen.padua/',
      x: 84,
      y: 53,
    },
  ],
};
