/** @type {import('next').NextConfig} */
const nextConfig = {
    // productionBrowserSourceMaps: false, // Disable source maps in development
    // optimizeFonts: false, // Disable font optimization
    minify: true,
    images: {
        domains: ['cdn.cloudflare.steamstatic.com', 'ddragon.leagueoflegends.com'],
    },
    eslint: 
    {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
