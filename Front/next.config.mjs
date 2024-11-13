/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.wixstatic.com',
      'scontent.cdninstagram.com',
      'media.toyota.com.ar',
      'www.centromotorsa.com.ar',
      'cdn.motor1.com',
      'acnews.blob.core.windows.net',
      'cdn.autobild.es',
      'res.cloudinary.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
