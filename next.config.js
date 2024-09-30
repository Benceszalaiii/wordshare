/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'vercel.com',
      },
      {
        hostname: 'i.scdn.co',
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
