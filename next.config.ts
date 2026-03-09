import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow all HTTPS sources — needed for dev placeholders from any domain
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
