import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Autorise tous les chemins sous ce domaine
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Autorise tous les chemins sous ce domaine
      },
    ],
  },
};

export default nextConfig;
