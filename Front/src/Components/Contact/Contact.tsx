"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import logo from "@/Assets/LogoRojo.png";
import { fetchPostConsulta } from '@/utils/FetchCon/FetchCon'; // Ajusta la ruta según tu estructura de carpetas

interface IConsulta {
  nombre: string;
  telefono: string;
  email: string;
  mensaje?: string;
}

const Detail = () => {
  const [consulta, setConsulta] = useState<IConsulta>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsulta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetchPostConsulta(consulta);
      setMessage('Consulta enviada exitosamente.');
      setConsulta({ nombre: '', telefono: '', email: '', mensaje: '' }); // Limpiar formulario
    } catch (error) {
      setMessage('Error al enviar la consulta.');
    }
  };

  return (
    <div className="relative mb-20">
      <h2 className="text-center text-3xl font-bold p-5">Detalles</h2>

      <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white py-10 px-10">
        {/* Columna Izquierda */}
        <div className="md:w-1/3 flex flex-col justify-start gap-10 mb-8 md:mb-0 md:pr-10">
          <h2 className="text-2xl md:text-3xl font-light text-center text-white mb-2">
            ¿Te gustaría venir a verlo?
          </h2>
          <div className="w-full flex justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <p className="text-center text-xl mb-6">
            ¡Escríbenos un mensaje con la fecha <br /> y un horario así te esperamos!
          </p>
        </div>

        {/* Columna Derecha */}
        <div className="w-full md:w-1/3 bg-[#222222] p-6 rounded-md shadow-md">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              <span className="mb-1">Nombre Completo:</span>
              <input
                type="text"
                name="nombre"
                value={consulta.nombre}
                onChange={handleChange}
                placeholder="Ingrese su nombre completo"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Teléfono:</span>
              <input
                type="text"
                name="telefono"
                value={consulta.telefono}
                onChange={handleChange}
                placeholder="Ingrese su número de teléfono"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Email:</span>
              <input
                type="email"
                name="email"
                value={consulta.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Mensaje:</span>
              <textarea
                name="mensaje"
                value={consulta.mensaje || ''}
                onChange={handleChange}
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

            {message && <p className="text-center text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Detail;
