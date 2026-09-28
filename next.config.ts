import type { NextConfig } from "next";
const { CONTENTFUL_SPACE_ID } = process.env;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: `/${CONTENTFUL_SPACE_ID}/**`,
      },
    ],
  },

};

export default nextConfig;
