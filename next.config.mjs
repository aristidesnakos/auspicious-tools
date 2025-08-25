/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable dev overlay and build indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'top-left',
  },
};

export default nextConfig;
