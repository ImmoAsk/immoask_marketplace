import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1','192.168.1.64'],
  async redirects() {
    return [
      {
        source: "/connexion",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/creer-un-compte",
        destination: "/auth/signup",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/immoask-api",
        destination: "https://immoaskprodapi.omnisoft.africa/api/v2",
      },
    ]
  },
};

export default nextConfig;
