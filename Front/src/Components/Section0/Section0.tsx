import React from 'react';

const Section0: React.FC = () => {
  return (
    <section className="relative md:h-[730px] h-[550px] md:mx-4"> {/* Reducí las alturas */}
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

      {/* Superposición en la parte inferior */}
      <div className="absolute bottom-0 w-full bg-black/70 flex items-center p-6">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full">
          {/* Contenedor de la izquierda */}
          <div className="flex-1 flex items-center justify-center md:justify-start lg:pl-[100px]">
            <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl text-center md:text-left">
              ¡Bienvenido a nuestra agencia!
            </h2>
          </div>

          {/* Contenedor de la derecha */}
          <div className="flex-1 flex items-center justify-center px-4 lg:pr-[70px]">
            <p className="text-white text-base xl:text-lg text-justify w-full md:w-[88%]">
              Somos una empresa familiar con casi 23 años en el rubro automotriz. El trato personal, la responsabilidad
              y el compromiso nos caracterizan. Buscamos que cada persona pueda disfrutar su auto al máximo, sin
              complicaciones en el momento de la compra y sin complicaciones posteriores. Las fotos y videos de nuestra
              página buscan reflejar la pasión y el gusto que tenemos por los autos. Si alguno te gusta o te interesa,
              no dudes en consultarnos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section0;
