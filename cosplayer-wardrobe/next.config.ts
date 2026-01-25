import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Mengabaikan error TypeScript agar build tetap berjalan
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengabaikan error ESLint saat proses build di Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;