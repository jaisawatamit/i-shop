/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // 'http' for localhost
                hostname: 'localhost', // Required hostname
                port: '3000', // Add the correct port if needed
            }
        ],
    },
};

export default nextConfig;