import type { WorldScene } from '../../model/types';
import { articleHref } from '../../lib/routes';
import { lakeHorizonMask } from './horizon';
import { socialLinks } from '../../data/site';
export const lakeScene: WorldScene = {
  id: 'lake',
  name: 'Lake',
  title: ['I’m Glen,', 'a software engineer.'],
  body: ['I’ve been building things for the internet for over ten years.'],
  discovery: {
    label: 'Skipping leg day since 2008.',
    href: articleHref('lottery-of-birth'),
  },
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
  hotspots: [
    {
      id: 'exercise',
      label: 'Find me doing this on Instagram',
      href: socialLinks.instagram,
      x: 83.5,
      y: 61,
    },
  ],
};
