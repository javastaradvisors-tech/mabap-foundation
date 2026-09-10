/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces plain HTML/CSS/JS in `out/`, deployable anywhere
  // (Netlify, GitHub Pages, any static host) with no Node server required —
  // matching how the current static site is hosted. Remove this once the
  // site needs server-rendered/dynamic features (Supabase, donations, etc.).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
