/** @type {import('next').NextConfig} */

const nextConfig = {
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
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
