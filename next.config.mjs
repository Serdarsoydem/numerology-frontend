/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images : {
        remotePatterns : [{
            hostname :"res.cloudinary.com",
            protocol : "https"
        }]
    }
};

export default nextConfig;
