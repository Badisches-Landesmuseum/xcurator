// eslint-disable-next-line @typescript-eslint/no-var-requires
const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

configureRuntimeEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['de', 'nl', 'en'],
    defaultLocale: 'de',
  },
  images: {
    domains: [
      'expotest.bsz-bw.de',
      'iiif.q8r.3pc.de',
      'upload.wikimedia.org',
      'commons.wikimedia.org',
      'picsum.photos',
      'images.unsplash.com',
      'source.unsplash.com',
      'images.uba.uva.nl',
      'data.landesmuseum.de',
    ],
    deviceSizes: [
      96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
  },
  headers: async () => [
    {
      source: '/:all*(js)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
