import type { NextConfig } from "next";

const apiUrl = (process.env.API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    skipTrailingSlashRedirect: true,
    async rewrites() {
        return [
            { source: "/api/:path*", destination: `${apiUrl}/api/:path*` },
            { source: "/_allauth/:path*", destination: `${apiUrl}/_allauth/:path*` },
            { source: "/accounts/:path*", destination: `${apiUrl}/accounts/:path*` },
            { source: "/media/:path*", destination: `${apiUrl}/media/:path*` },
        ];
    },
};

export default nextConfig;
