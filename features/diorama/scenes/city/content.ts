import type { WorldScene } from '../../model/types';
import { worldRoutes } from '../../lib/routes';
export const cityScene: WorldScene = {
  id: 'city',
  name: 'City',
  eyebrow: 'After hours.',
  title: ['Nothing urgent.', 'For a change.'],
  description:
    'Glen sits with his wife, both holding coffee, on a terrace above the city at night. His left leg is a prosthesis. A notebook, satchel and lantern are beside them.',
  sky: '#567faf',
  skyTime: 1,
  mobile: { width: 210, left: -109 },
  layers: [
    { id: 'back', asset: 'city-back', depth: 0.16, responsive: true },
    { id: 'terrace', asset: 'city-front', depth: 0.75, responsive: true },
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
      id: 'satchel',
      label: 'Work',
      href: worldRoutes.work,
      x: 93.5,
      y: 74,
    },
  ],
};
