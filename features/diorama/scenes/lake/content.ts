import type { WorldScene } from '../../model/types';
import { lakeHorizonMask } from './horizon';
export const lakeScene: WorldScene = {
  id: 'lake',
  name: 'Lake',
  title: ['I’m Glen,', 'a software engineer.'],
  // The second line retypes itself through these, then settles back.
  titleSwaps: {
    line: 1,
    correctFirst: true,
    cycles: 2,
    phrases: [
      'a human in the loop.',
      'always building something.',
      'a serial leg-day skipper.',
    ],
  },
  body: ['I’ve been building things for the internet for over ten years.'],
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
      responsive: true,
      mask: lakeHorizonMask,
    },
    {
      id: 'character',
      asset: 'lake-character',
      x: 68,
      y: 52,
      width: 18,
    },
    { id: 'grass', asset: 'grass' },
  ],
  // The bar is a control in scene.tsx, not a link: the opening scene keeps
  // visitors in the day rather than sending them off to an article.
  hotspots: [],
};
