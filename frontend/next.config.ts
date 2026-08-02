import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

export default nextConfig;