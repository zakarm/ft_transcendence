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
    env: {
        NEXT_PUBLIC_BACKEND_HOST: process.env.NEXT_PUBLIC_BACKEND_HOST,
        NEXT_PUBLIC_BACKEND_WS_HOST: process.env.NEXT_PUBLIC_BACKEND_WS_HOST,
        HOST_IP: process.env.HOST_IP,
        FRONTEND_HOST: process.env.FRONTEND_HOST

    },
};

export default nextConfig;
