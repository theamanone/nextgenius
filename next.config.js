/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Required for Three.js
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
  // Add CSS support
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

module.exports = nextConfig;
