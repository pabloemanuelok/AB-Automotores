import React from 'react';

const Section0: React.FC = () => {
  return (
    <section className="relative md:h-[390px] h-[260px] md:mx-4">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://video.wixstatic.com/video/0816f9_e63ef511f08e4e98a63c5234ec756ebb/720p/mp4/file.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="https://example.com/path/to/your/poster-image.jpg" // Imagen de respaldo mientras se carga el video
        aria-label="Video de fondo"
        preload="metadata" // Cargar solo los metadatos inicialmente
      >
        <p>Tu navegador no soporta el elemento de video.</p>
      </video>
    </section>
  );
};

export default Section0;
