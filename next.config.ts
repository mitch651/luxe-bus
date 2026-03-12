import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // Netlify uses OpenNext - no output: 'standalone' (that's for Vercel/Docker)
  // All images are local in public/images/
};

export default nextConfig;
