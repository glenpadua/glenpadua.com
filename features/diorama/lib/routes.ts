/** Change the mount once when promoting the experience; article URLs stay stable. */
export function createWorldRoutes(base: string) {
  const prefix = base.replace(/\/+$/, '');
  return {
    home: prefix || '/',
    work: `${prefix}/work`,
    stories: `${prefix}/stories`,
  };
}
export const worldRoutes = createWorldRoutes('/preview/diorama');
