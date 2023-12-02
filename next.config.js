/** @type {import('next').NextConfig} */
const nextConfig = {
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
    },
    // output: 'standalone',
    // images: { unoptimized: true },
    // useFileSystemPublicRoutes: false
}

module.exports = nextConfig
