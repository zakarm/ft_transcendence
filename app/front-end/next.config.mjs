/** @type {import('next').NextConfig} */
const nextConfig = {
    minify: true,
    compress: true,
    images: {
        remotePatterns: [
            { hostname: 'cdn.cloudflare.steamstatic.com' },
            { hostname: 'ddragon.leagueoflegends.com' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'cdn.intra.42.fr' },
            { hostname: 'avatars.githubusercontent.com' },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
