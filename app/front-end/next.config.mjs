/** @type {import('next').NextConfig} */
const nextConfig = {
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // minify: true,
  images: {
    domains: [
      "cdn.cloudflare.steamstatic.com",
      "ddragon.leagueoflegends.com",
      "lh3.googleusercontent.com",
      "cdn.intra.42.fr",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
