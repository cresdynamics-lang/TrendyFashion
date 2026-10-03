import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "trendyfashionzone.co.ke", pathname: "/**" },
      { protocol: "http", hostname: "trendyfashionzone.co.ke", pathname: "/**" },
      { protocol: "https", hostname: "**.digitaloceanspaces.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
