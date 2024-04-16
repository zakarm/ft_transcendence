/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    minify: false,
    images: {
        domains: ['cdn.cloudflare.steamstatic.com', 'ddragon.leagueoflegends.com'],
      },
};

export default nextConfig;
