/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve resized WebP via Next - smaller payloads, faster first paint
    formats: ["image/webp"],
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "trendyfashionzone.co.ke", pathname: "/**" },
      { protocol: "http", hostname: "trendyfashionzone.co.ke", pathname: "/**" },
      { protocol: "https", hostname: "**.digitaloceanspaces.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/journal/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/journal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
