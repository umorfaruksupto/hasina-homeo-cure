/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/zilla/chittagong',
        destination: '/zilla/chattogram',
        permanent: true,
      },
      {
        source: '/zilla/comilla',
        destination: '/zilla/cumilla',
        permanent: true,
      },
      {
        source: '/zilla/jessore',
        destination: '/zilla/jashore',
        permanent: true,
      },
      {
        source: '/zilla/bogra',
        destination: '/zilla/bogura',
        permanent: true,
      },
      {
        source: '/zilla/bograh',
        destination: '/zilla/bogura',
        permanent: true,
      },
      {
        source: '/zilla/barisal',
        destination: '/zilla/barishal',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
