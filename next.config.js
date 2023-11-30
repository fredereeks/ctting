/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'standalone',
    // images: { unoptimized: true },
    // useFileSystemPublicRoutes: false
}

module.exports = nextConfig
