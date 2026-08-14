/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      'ik.imagekit.io',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  // La ruta vieja sigue indexada y linkeada desde afuera: el 301 traspasa el
  // posicionamiento en vez de dejar un 404.
  async redirects() {
    return [
      // statusCode 301 y no permanent:true, que en Next emite un 308. Google los
      // trata igual, pero el 301 es el que espera el doc y las herramientas de auditoria.
      { source: '/views/contacto', destination: '/contacto', statusCode: 301 },
      { source: '/views/consignaciones', destination: '/consignaciones', statusCode: 301 },
      { source: '/views/financiacion', destination: '/financiacion', statusCode: 301 },
    ];
  },
};

export default nextConfig;
