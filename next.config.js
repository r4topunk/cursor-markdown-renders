/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.skatehive.app',
        pathname: '/ipfs/**',
      },
    ],
  },
};

module.exports = nextConfig; 