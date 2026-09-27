import type { WorldScene } from '../../model/types';
import { worldRoutes } from '../../lib/routes';
export const beachScene: WorldScene = {
  id: 'beach',
  name: 'Beach',
  eyebrow: 'Still very much online.',
  title: ['The office', 'has moved.'],
  body: ['I like my work. I just don’t think', 'it needs four walls.'],
  description:
    'Glen sits on the sand under a striped beach umbrella, wearing a yellow striped shirt and working on a laptop. His left leg is prosthetic. He faces the laptop and types quietly.',
  sky: '#dcf1f0',
  skyTime: 0.45,
  mobile: { width: 190, left: -28 },
  layers: [
    { id: 'back', asset: 'beach-back', depth: 0.16, responsive: true },
    {
      id: 'character',
      asset: 'beach-typing-focused',
      depth: 0.65,
      x: 18,
      y: 43,
      width: 28,
    },
  ],
  hotspots: [
    {
      id: 'beach-laptop',
      label: 'See my work',
      href: worldRoutes.work,
      x: 37,
      y: 74,
    },
  ],
};
