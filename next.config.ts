import type { NextConfig } from "next";

// Repo is sila-uma/sila-uma.github.io -> served at the domain root,
// so no basePath is needed (unlike a project-page repo).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
