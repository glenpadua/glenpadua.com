import type { WorldScene } from '../../model/types';
import { worldRoutes } from '../../lib/routes';
export const cityScene: WorldScene = {
  id: 'city',
  name: 'City',
  title: ['Then there’s life too.'],
  body: [
    'I’ve picked up a few stories along the way. Occasionally, I even finish writing them.',
    'I’m always curious how other people work, and what slows them down. If you’d like to swap notes, I’m up for a chat.',
  ],
  description:
    'Glen sits with his wife, both holding coffee, on a terrace above the city at night. His left leg is a prosthesis. A notebook, satchel and lantern are beside them.',
  sky: '#567faf',
  skyTime: 1,
  entrance: 'dusk',
  mobile: { width: 210, left: -109 },
  layers: [
    { id: 'back', asset: 'city-back', responsive: true },
    {
      id: 'terrace',
      asset: 'city-front-glasses-v1',
      responsive: true,
    },
  ],
  hotspots: [
    {
      id: 'notebook',
      label: 'Writing',
      href: worldRoutes.writing,
      x: 69.5,
      y: 75,
    },
  ],
};
