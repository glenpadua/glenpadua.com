/** Compatibility facade for earlier tooling; edit feature-owned content instead. */
export { worldRoutes } from '@/features/diorama/lib/routes';
export { worldAsset } from '@/features/diorama/lib/assets';
export { worldScenes } from '@/features/diorama/data/scenes';
export { contactHref } from '@/features/diorama/data/site';
export {
  deskProjects,
  type DeskProject,
} from '@/features/diorama/rooms/work/content';
export {
  deskArticles,
  type DeskArticle,
} from '@/features/diorama/rooms/stories/content';
export type {
  WorldScene,
  WorldLayer,
  WorldHotspot,
} from '@/features/diorama/model/types';
