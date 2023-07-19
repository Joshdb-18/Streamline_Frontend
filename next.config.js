/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
