/** @type {import('next').NextConfig} */
// const withTM = require('next-transpile-modules')([
//   '@tawk.to/tawk-messenger-react',
// ]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.api-sports.io', 'res.cloudinary.com'],
  },
};
// module.exports = withTM({ nextConfig });
module.exports = nextConfig;
