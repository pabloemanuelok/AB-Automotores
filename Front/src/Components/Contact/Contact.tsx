"use client";

import React, { useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsulta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await fetchPostConsulta(consulta);
      setMessage('Consulta enviada exitosamente.');
      setConsulta({ nombre: '', telefono: '', email: '', mensaje: '' }); // Limpiar formulario
    } catch (error) {
      setMessage('Error al enviar la consulta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mb-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 bg-white text-white py-8 px-0 lg:px-12 mt-4">
        {/* Columna Izquierda */}
        <div className="flex flex-col md:justify-start justify-center items-center md:items-start gap-10 mb-8 px-20 2xl:pl-24 md:mb-0 md:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-center md:text-start text-black mb-2">
            ¿Quieres comunicarte con nosotros?
          </h2>
          <p className="md:text-start text-center font-bold text-black text-xl mb-6">
            Completá el formulario con tus datos y nos comunicamos para
            brindarte toda la información!
          </p>
        </div>

        {/* Columna Derecha */}
        <div className="w-[90%] xl:w-[40%] 2xl:w-[42%] bg-[#222222] p-6 rounded-md shadow-md md:pl-4 md:ml-2">
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
                required
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
                required
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
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Mensaje:</span>
              <textarea
                name="mensaje"
                value={consulta.mensaje || ''}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí"
                className="p-2 rounded-md placeholder:text-neutral-500 border border-white bg-[#2C2C2C] text-white"
              ></textarea>
            </label>

            <button
              type="submit"
              className={`w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ${loading ? 'bg-gray-500' : ''}`}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>

          {message && <p className="text-center text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Detail;
