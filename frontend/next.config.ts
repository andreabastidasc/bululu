import type { NextConfig } from "next";

const apiUrl = (process.env.API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    skipTrailingSlashRedirect: true,
    async rewrites() {
        return ["api", "_allauth", "accounts", "media"].flatMap((prefix) => [
            { source: `/${prefix}/:path*/`, destination: `${apiUrl}/${prefix}/:path*/` },
            { source: `/${prefix}/:path*`, destination: `${apiUrl}/${prefix}/:path*` },
        ]);
    },
};

export default nextConfig;
