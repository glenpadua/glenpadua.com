import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from './sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case 'post':
      return `/blog/${doc.uid}`;
    case 'snippet':
      return `/snippets/${doc.uid}`;
    default:
      return '/';
  }
}

const routes = [
  {
    type: 'post',
    path: '/blog/:uid',
  },
  {
    type: 'snippet',
    path: '/snippets/:uid',
  },
];

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    routes,
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
}
