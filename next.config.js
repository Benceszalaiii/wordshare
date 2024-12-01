const nextConfig = {
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

module.exports = nextConfig;
