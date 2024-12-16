import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
            },
            {
                hostname: "vercel.com",
            },
            {
                hostname: "i.scdn.co",
            },
            {
                hostname: "xhzwexjdzphrgjiilpid.supabase.co",
            },
            {
                hostname: "assets.aceternity.com",
            },
        ],
    },

    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/benceszalaiii",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;