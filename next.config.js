/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com", "i.scdn.co"],
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
