/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The illustrated site was previewed under /preview/diorama.
      { source: '/preview/diorama', destination: '/', permanent: true },
      {
        source: '/preview/diorama/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Earlier animation studies, now archived.
      { source: '/preview/:path*', destination: '/', permanent: true },
      // The old site's pages: the blog index became Writing, skills fold into Work.
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/skills', destination: '/work', permanent: true },
      // Stories were once published under /story/<uid>.
      { source: '/story/:uid', destination: '/blog/:uid', permanent: true },
    ];
  },
};

export default nextConfig;
