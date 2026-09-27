import type { WorldScene } from '../../model/types';
export const beachScene: WorldScene = {
  id: 'beach',
  name: 'Beach',
  title: ['A laptop and decent wifi is all I need.'],
  body: [
    'By day I’m an engineer at Remote.com. On the side, I build things for problems worth solving: with AI where it helps, and without it where it doesn’t.',
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
