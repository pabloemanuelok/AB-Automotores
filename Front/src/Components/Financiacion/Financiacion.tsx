"use client";

import React, { useState } from "react";
import { fetchPostConsulta } from "@/utils/FetchCon/FetchCon"; // Ajusta la ruta según sea necesario
import { IConsulta, Banco } from "@/Interfaces/Interface";

const Financiacion = () => {
  const [formData, setFormData] = useState<Omit<IConsulta, "_id">>({
    nombre: "",
    email: "",
    telefono: "",
    banco: Banco.SANTANDER, // Valor predeterminado
    mensaje: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData); // Verifica los datos enviados
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
    }
  };

  return (
    <div className="relative">
      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between py-4 lg:px-[120px] gap-6">
        {/* Columna izquierda: Texto */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col gap-4 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Si no llegas con el efectivo, ¡Podés financiarlo!
          </h2>
          <p className="text-black font-semibold text-lg">
            Créditos bancarios, personales ó prendarios, a través de Banco de Córdoba, Banco Santander o Banco HSBC. <br />
            También financiamos solo con el DNI y recibimos tarjetas de crédito. Pedinos más información!
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-black mt-6">
            ¿Quieres averiguar tu crédito disponible?
          </h2>
          <p className="text-black font-semibold text-lg">
            Completá el formulario con tus datos y te contactamos para brindarte toda la información!
          </p>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="flex-1 w-full lg:w-1/2 bg-[#222222] p-6 rounded-md shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col text-white">
              <span className="mb-1">Nombre Completo:</span>
              <input
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese su nombre completo"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>
            <label className="flex flex-col text-white">
              <span className="mb-1">Teléfono:</span>
              <input
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingrese su número de teléfono"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col text-white">
              <span className="mb-1">Email:</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col text-white">
              <span className="mb-1">Mensaje:</span>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí"
                className="p-2 rounded-md placeholder:text-neutral-500 border border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <button
              type="submit"
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Enviar
            </button>
          </form>
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
