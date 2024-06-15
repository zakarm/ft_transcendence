/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // port: '',
                // pathname: '/dv1i5yh71/image/upload/**',
            },
            { hostname: 'cdn.cloudflare.steamstatic.com' },
            {
                protocol: 'http',
                hostname:  'locahost:3000' },
            { hostname: 'ddragon.leagueoflegends.com' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'cdn.intra.42.fr' },
            { hostname: 'avatars.githubusercontent.com' },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
