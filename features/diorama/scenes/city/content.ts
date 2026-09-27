import type { WorldScene } from '../../model/types';
import { contactHref } from '../../data/site';
import { worldRoutes } from '../../lib/routes';
export const cityScene: WorldScene = {
  id: 'city',
  name: 'City',
  title: ['Then there’s life too.'],
  body: [
    'I’ve picked up a few stories along the way. Occasionally, I even finish writing them.',
    'And if something in your business is eating hours it shouldn’t, I’d like to hear about it.',
  ],
  discovery: { label: 'Say hello', href: contactHref },
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
      label: 'Stories',
      href: worldRoutes.stories,
      x: 69.5,
      y: 75,
    },
    {
      id: 'coffee',
      label: 'Have something in mind? Say hello',
      href: contactHref,
      x: 75.5,
      y: 71,
    },
  ],
};
