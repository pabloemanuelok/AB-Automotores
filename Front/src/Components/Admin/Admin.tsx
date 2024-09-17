"use client";

import React, { useContext } from "react";
import ClientInquiry from "./ConsultasClient/ConsultasClient";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";

const AdminAddVehicle: React.FC = () => {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Ejecuta la función de logout
    router.push("/"); // Redirige al home
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <h2 className="text-2xl md:text-4xl text-center font-semibold bg-white p-5 text-black w-full mb-6">
        Agregar vehículos
      </h2>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-md bg-[#222222] p-8 rounded-lg shadow-md">
        {/* Formulario */}
        <form className="flex flex-col gap-2">
          {/* Campos de Entrada */}
          <label htmlFor="name" className="text-white">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            placeholder="Toyota Corolla"
            className="w-full p-2 text-white bg-[#222222] placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="version" className="text-white">
            Versión:
          </label>
          <input
            id="version"
            type="text"
            autoComplete="off"
            placeholder="XLI CVT"
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="year" className="text-white">
            Año:
          </label>
          <input
            id="year"
            type="number"
            autoComplete="off"
            placeholder="2024"
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="description" className="text-white">
            Descripción:
          </label>
          <input
            id="description"
            type="text"
            autoComplete="off"
            placeholder="Descripcion de vehiculo"
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          {/* Campos para Subir Imágenes */}
          <label htmlFor="mainImgUrl" className="text-white">
            Imagen Principal:
          </label>
          <input
            id="mainImgUrl"
            type="file"
            className="w-full p-2 border text-white bg-[#222222] border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="images" className="text-white">
            Imágenes:
          </label>
          <input
            id="images"
            type="file"
            className="w-full p-2 border text-white bg-[#222222] border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
            multiple
          />

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#D9D9D9] text-black rounded hover:bg-gray-300 transition-colors"
          >
            Agregar
          </button>
        </form>
      </div>
      <ClientInquiry/>

      {/* Botón de Cerrar Sesión */}
      <div className="mt-8 w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-slate-500 text-yellow-500 hover:text-yellow-400 hover:scale-110 font-bold py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default AdminAddVehicle;
