import React from 'react'
import Image from 'next/image'
import logo from "@/Assets/LogoRojo.png"

const Contact = () => {
  return (
    <div className="relative mb-20">
      {/* Título de la sección */}
      <h2 className="text-center text-3xl font-bold p-5">Contacto</h2>

      {/* Vista de escritorio */}

      <div>
        <div className="flex flex-col md:flex-row items-center justify-center  bg-black text-white py-10 px-10">
          {/* Columna Izquierda */}
          <div className="md:w-1/3 flex flex-col justify-start gap-10 mb-8 md:mb-0 md:pr-10">
            <h2 className="text-2xl md:text-3xl font-light text-center text-white mb-2">
              ¿Quieres contactarte <br /> con nosotros?
            </h2>
            <div className="w-full flex justify-center">
              <Image
                src={logo} // Reemplaza con la ruta de tu imagen
                alt="Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <p className="text-center text-xl mb-6">
              ¡Escríbenos un mensaje con tu consulta y <br /> te responderemos
              en la brevedad!
            </p>
            {/* Logo */}
          </div>

          {/* Columna Derecha */}
          <div className="w-full md:w-1/3 bg-[#222222] p-6 rounded-md shadow-md">
            <form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <span className="mb-1">Nombre Completo:</span>
                <input
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Teléfono:</span>
                <input
                  type="text"
                  placeholder="Ingrese su numero de telefono"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Email:</span>
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Mensaje:</span>
                <textarea
                  placeholder="Descripción"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                ></textarea>
              </label>

              <button
                type="submit"
                className="bg-[#D9D9D9] hover:bg-RojoAb hover:text-white text-black py-2 px-4 rounded-md"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact