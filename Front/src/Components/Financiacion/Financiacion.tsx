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
    <div className="relative pb-4 ">
      {/* Vista de escritorio */}
      <div className="bg-white flex items-center justify-between py-4 lg:px-[120px]">
        <div className="flex flex-col md:justify-between pl-2 md:flex-row w-full ">
          {/* Contenedor de la izquierda */}
          <div className="flex-1 flex items-center justify-center md:justify-start pr-10 md:mb-0">
            <h2 className="text-black text-2xl font-semibold lg:text-3xl ml-8 pl-8 lg:pl-2 lg:ml-0 text-center md:text-left">
              Si no llegas con el efectivo <br />
              ¡Podés financiarlo!
            </h2>
          </div>
          {/* Contenedor de la derecha */}
          <div className="flex-1 flex px-6 items-center sm:justify-center ">
            <p className="text-black font-semibold text-base lg:text-xl text-center md:text-left ">
              {" "}
              {/* Ahora es ml-16 para un mayor desplazamiento hacia la derecha */}
              Podemos ofrecerte una amplia línea de créditos: <br /> Créditos
              bancarios, personales ó prendarios, a través de Banco de Córdoba,
              Banco Santander o Banco HSBC. <br />
              También financiamos solo con el DNI y recibimos tarjetas de
              crédito. Pedinos más información!
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 bg-white text-white px-0 lg:px-10 ">
          {/* Columna Izquierda */}
          <div className="flex flex-col md:justify-start justify-center items-center md:items-start md:gap-10 mb-8 px-20 2xl:pl-24 md:mb-0 md:w-1/2 w-[100%]">
            <h2 className="text-2xl md:text-4xl font-bold text-center md:text-start text-black mb-2">
              ¿Quieres averiguar tu crédito disponible?
            </h2>
            <p className="md:text-start w-[100%] text-black font-bold text-center text-base ">
              Completá el formulario con tus datos y te contactamos para
              brindarte toda la información!
            </p>
          </div>

          {/* Columna Derecha */}
          <div className="w-[90%] md:w-[40%] xl:w-[40%] 2xl:w-[42%] bg-[#222222] p-6 rounded-md shadow-md md:p-4 md:ml-2 ">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
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
              <label className="flex flex-col">
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

              <label className="flex flex-col">
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

              <label className="flex flex-col">
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
              <p className="text-green-500 text-center mt-4">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
