"use client";

import React, { useState } from "react";
import Image from "next/image";
import bancor from "@/Assets/BANCOR 1.png";
import santander from "@/Assets/Santander.png";
import hsbc from "@/Assets/HSBC.png";
import superville from "@/Assets/Superville.png";
import logo from "@/Assets/LogoRojo.png";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
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
    <div className="relative pb-20">
      {/* Título de la sección */}
      <h2 className="text-center text-3xl font-bold p-5">Financiación</h2>

      {/* Vista de escritorio */}
      <div className="bg-Negro min-h-[300px] flex items-center p-4 ">
        <div className="flex flex-col md:flex-row w-full">
          {/* Contenedor de la izquierda */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
            <h2 className="text-white text-2xl md:text-4xl text-center md:text-left">
              Si no llegas con el efectivo <br />
              ¡Podés financiarlo!
            </h2>
          </div>

          {/* Contenedor de la derecha */}
          <div className="flex-1 flex md:w-1/3 items-center justify-center px-4 md:px-8">
            <p className="text-white text-base md:text-lg text-center md:text-left">
              Podemos ofrecerte una amplia línea de créditos: <br /> Créditos
              bancarios, personales ó prendarios, a través de Banco de Córdoba,
              Banco Santander o Banco HSBC. <br />
              También financiamos solo con el DNI y recibimos tarjetas de
              crédito. <br /> Pedinos más información!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white gap-8 w-full md:flex-row md:gap-28">
        <Image
          src={bancor}
          alt="Logo Banco 1"
          width={150}
          height={100}
          className="mx-2"
        />
        <Image
          src={santander}
          alt="Logo Banco 2"
          width={150}
          height={50}
          className="mx-2"
        />
        <Image
          src={hsbc}
          alt="Logo Banco 3"
          width={150}
          height={100}
          className="mx-2"
        />
        <Image
          src={superville}
          alt="Logo Banco 4"
          width={150}
          height={100}
          className="mx-2"
        />
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white py-10 px-10">
          {/* Columna Izquierda */}
          <div className="md:w-1/3 flex flex-col justify-start gap-10 mb-8 md:mb-0 md:pr-10">
            <h2 className="text-2xl md:text-3xl font-light text-center text-white mb-2">
              ¿Quieres averiguar tu crédito <br /> disponible?
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
              ¡Escríbenos un mensaje con el banco y el <br /> vehículo que te
              interese!
            </p>
          </div>

          {/* Columna Derecha */}
          <div className="w-full md:w-1/3 bg-[#222222] p-6 rounded-md shadow-md">
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
                <span className="mb-1">Banco:</span>
                <select
                  name="Banco"
                  value={formData.banco}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-white bg-[#2C2C2C] text-white"
                >
                  {Object.values(Banco).map(banco => (
                    <option key={banco} value={banco}>
                      {banco}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Mensaje:</span>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí"
                  className="p-2 rounded-md border border-white bg-[#2C2C2C] text-white"
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
    </div>
  );
};

export default Financiacion;
