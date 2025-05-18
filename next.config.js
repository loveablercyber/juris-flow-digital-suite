/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['wyonzomnplhgqnfsuphg.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 