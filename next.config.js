/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "avatars.githubusercontent.com",
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: "flagcdn.com",
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: "upload.wikimedia.org",
            port: '',
            pathname: '/**',
          },
          
        ],
      },
}

module.exports = nextConfig
