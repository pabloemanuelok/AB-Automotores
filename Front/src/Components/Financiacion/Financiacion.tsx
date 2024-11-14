"use client";

import React, { useState } from "react";
import { fetchPostConsulta } from "@/utils/FetchCon/FetchCon";
import { IConsulta, Banco } from "@/Interfaces/Interface";

const Financiacion = () => {
  const [formData, setFormData] = useState<Omit<IConsulta, "_id">>({
    nombre: "",
    email: "",
    telefono: "",
    banco: Banco.SANTANDER,
    mensaje: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
      setErrorMessage("Todos los campos son obligatorios.");
      setSuccessMessage(null);
      return;
    }

    setIsLoading(true);
    try {
      console.log(formData);
      await fetchPostConsulta(formData);
      setSuccessMessage("Consulta enviada con éxito");
      setErrorMessage(null);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        banco: Banco.SANTANDER,
        mensaje: "",
      });
    } catch (error) {
      setErrorMessage("Error al enviar la consulta");
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-6xl p-6 rounded-lg shadow-lg bg-white">
        {/* Sección de texto con animación */}
        <div className="lg:flex lg:justify-between gap-8 animate-fade-in">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="border-l-4 border-red-500 pl-4 mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Si no llegas con el efectivo <br /> ¡Podés financiarlo!
              </h2>
              <p className="text-gray-600">
                Créditos bancarios, personales ó prendarios, a través de Banco de Córdoba, Banco Santander o Banco HSBC. <br />
                También financiamos solo con el DNI y recibimos tarjetas de crédito. Pedinos más información!
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-4">
                ¿Quieres averiguar tu crédito disponible?
              </h2>
              <p className="text-gray-600">
                Completá el formulario con tus datos y te contactamos para brindarte toda la información!
              </p>
            </div>
          </div>

          {/* Formulario con sombras y animación */}
          <div className="flex-1 bg-gray-900 text-white p-6 rounded-md shadow-md animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col">
                <span className="mb-1">Nombre Completo:</span>
                <input
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre completo"
                  className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Teléfono:</span>
                <input
                  name="telefono"
                  type="text"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese su número de teléfono"
                  className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Email:</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                  className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Mensaje:</span>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí"
                  className="p-2 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-lg disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </form>
            {successMessage && (
              <p className="text-green-400 text-center mt-4" aria-live="polite">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-400 text-center mt-4" aria-live="assertive">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
