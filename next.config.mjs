/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    }
};

export default nextConfig;
