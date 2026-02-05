import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from '../sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'post',
    path: '/blog/:uid',
  },
];

export function createClient(
  config: prismic.ClientConfig = {},
): prismic.Client {
  const client = prismic.createClient(endpoint, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { cache: 'force-cache', next: { tags: ['prismic'] } }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
