/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Tree-shaking ciblé : n'embarque que les icônes/utilitaires réellement
    // importés au lieu du barrel complet.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
