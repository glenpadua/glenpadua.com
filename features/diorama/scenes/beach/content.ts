import type { WorldScene } from '../../model/types';
export const beachScene: WorldScene = {
  id: 'beach',
  name: 'Beach',
  eyebrow: 'Same guy. Fewer layers.',
  title: ['The laptop can wait', 'five minutes.'],
  body: [
    'I like having a job. I also like having a life.',
    'Working remotely helps with both.',
  ],
  description:
    'Glen, shirtless in dark shorts, with his left prosthetic foot resting on a football on a warm beach. A sailboat drifts offshore.',
  sky: '#dcf1f0',
  skyTime: 0.45,
  mobile: { width: 190, left: -28 },
  layers: [
    { id: 'back', asset: 'beach-back', depth: 0.16, responsive: true },
    {
      id: 'character',
      asset: 'beach-character',
      depth: 0.65,
      x: 23,
      y: 57,
      width: 18,
    },
  ],
  hotspots: [
    {
      id: 'outside',
      label: 'Life, outside the tabs',
      href: 'https://www.instagram.com/glen.padua/',
      x: 45,
      y: 78,
    },
  ],
};
