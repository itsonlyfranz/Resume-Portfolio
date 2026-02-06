import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly set turbopack root to the project directory
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withContentlayer(nextConfig);
