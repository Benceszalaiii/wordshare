/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
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
        hostname: "xhzwexjdzphrgjiilpid.supabase.co" 
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
