/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s4.anilist.co", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
