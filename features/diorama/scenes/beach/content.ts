import type { WorldScene } from '../../model/types';
export const beachScene: WorldScene = {
  id: 'beach',
  name: 'Beach',
  title: ['Some ideas don’t leave me alone.'],
  body: [
    'I work at Remote.com, build things on the side, and like finding out how far I can take an idea with AI.',
  ],
  description:
    'Glen sits on the sand under a striped beach umbrella, wearing a yellow striped shirt and working on a laptop. His left leg is prosthetic. He faces the laptop and types quietly. A phone lies on the sand beside him.',
  sky: '#dcf1f0',
  skyTime: 0.45,
  entrance: 'tide',
  mobile: { width: 190, left: -28 },
  layers: [
    { id: 'back', asset: 'beach-back', responsive: true },
    {
      id: 'character',
      asset: 'beach-typing-focused',
      x: 18,
      y: 43,
      width: 28,
    },
  ],
  hotspots: [],
};
