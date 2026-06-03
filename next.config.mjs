/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Project page on GitHub Pages serves under /portfolio.
// Override with BASE_PATH (e.g. '' for a user-site repo or custom domain at root).
const basePath = process.env.BASE_PATH ?? (isProd ? '/portfolio' : '');

const nextConfig = {
  output: 'export',
  basePath,
  // Static export cannot use the on-demand Image Optimizer.
  images: { unoptimized: true },
  // GitHub Pages serves /path/ as /path/index.html — emit trailing-slash dirs.
  trailingSlash: true,
  // Expose basePath to the client for prefixing static asset URLs (e.g. the resume PDF).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
