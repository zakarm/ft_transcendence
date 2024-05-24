/** @type {import('next').NextConfig} */
const nextConfig = {
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // minify: true,
  images: {
    remotePatterns: [
      { hostname: "cdn.cloudflare.steamstatic.com" },
      { hostname: "ddragon.leagueoflegends.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "cdn.intra.42.fr" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
