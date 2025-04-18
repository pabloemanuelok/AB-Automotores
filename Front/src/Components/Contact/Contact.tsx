"use client";

import React, { useState } from 'react';
import { fetchPostConsulta } from '@/utils/FetchCon/FetchCon'; // Ajusta la ruta según tu estructura de carpetas

interface IConsulta {
  nombre: string;
  telefono: string;
  email: string;
  mensaje?: string;
  // Campo honeypot para detectar bots
  _honeyPot: string;
}

const Contact = () => {
  const [consulta, setConsulta] = useState<IConsulta>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
    _honeyPot: '' // Este campo siempre debe estar vacío si es un usuario legítimo
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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

    // Si el campo honeypot no está vacío, es un bot
    if (consulta._honeyPot) {
      setError('¡Vas a tener que hacer algo más para pasar!');
      return;
    }

    setLoading(true);
    try {
      await fetchPostConsulta(consulta);
      setMessage('Consulta enviada exitosamente.');
      setError(null);
      setConsulta({ nombre: '', telefono: '', email: '', mensaje: '', _honeyPot: '' }); // Limpiar formulario
    } catch (error) {
      setError('Error al enviar la consulta.');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 flex items-center justify-center">
      <div className="w-full sm:w-[84%] p-6 rounded-lg shadow-2xl bg-white">
        <div className="lg:flex lg:justify-between gap-8">
          {/* Columna Izquierda */}
          <div className="flex-1 mb-6 lg:mb-0 animate-fade-in">
            <div className="border-l-4 border-red-500 pl-4 mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ¿Quieres comunicarte con nosotros?
              </h2>
              <p className="text-gray-600">
                Completá el formulario con tus datos y nos comunicamos para brindarte toda la información!
              </p>
            </div>
          </div>

          {/* Columna Derecha (Formulario) */}
          <div className="flex-1 bg-gray-900 text-white p-6 rounded-md shadow-md animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              {['nombre', 'telefono', 'email'].map((field) => (
                <label key={field} className="flex flex-col">
                  <span className="mb-1 capitalize">{field}:</span>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={consulta[field as keyof IConsulta] || ''}
                    onChange={handleChange}
                    placeholder={`Ingrese su ${field}`}
                    className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    required
                  />
                </label>
              ))}
              <label className="flex flex-col">
                <span className="mb-1">Mensaje:</span>
                <textarea
                  name="mensaje"
                  value={consulta.mensaje || ''}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí"
                  className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                ></textarea>
              </label>

              {/* Honeypot field: Campo oculto para detectar bots */}
              <div className="hidden">
                <label className="flex flex-col">
                  <span className="mb-1">No rellene este campo:</span>
                  <input
                    type="text"
                    name="_honeyPot"
                    value={consulta._honeyPot}
                    onChange={handleChange}
                    className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-lg disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>

            {message && (
              <p className="text-green-400 text-center mt-4" aria-live="polite">{message}</p>
            )}
            {error && (
              <p className="text-red-400 text-center mt-4" aria-live="assertive">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
