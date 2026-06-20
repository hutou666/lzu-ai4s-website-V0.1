import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Windows + 非 ASCII 项目路径下，并行预渲染易导致 webpack chunk 竞态（Cannot find module for page）
  experimental: {
    workerThreads: false,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 9999,
    staticGenerationRetryCount: 5,
  },
  webpack: (config) => {
    config.cache = false;
    config.parallelism = 1;
    return config;
  },
};

export default nextConfig;
