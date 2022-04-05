/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_STRIPE_API_KEY: process.env.NEXT_PUBLIC_STRIPE_API_KEY,
        NEXT_PUBLIC_NOTIFICATION_URL: process.env.NEXT_PUBLIC_NOTIFICATION_URL
    }
}

module.exports = nextConfig
