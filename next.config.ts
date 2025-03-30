import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:
          "uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net",
      },
    ],
  },
};

export default nextConfig;
