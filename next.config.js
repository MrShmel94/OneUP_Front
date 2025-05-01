/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.wikia.nocookie.net',
      'upload.wikimedia.org',
      'localhost',
      'oneup-power.vercel.app'
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 