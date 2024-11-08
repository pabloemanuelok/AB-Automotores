"use client";

import React, { useContext, useState } from "react";
import Swal from "sweetalert2"; // Asegúrate de tener SweetAlert2 instalado
import ConsultasClient from "./ConsultasClient/ConsultasClient";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import { fetchPostProduct } from "@/utils/FetchCars/FetchCars"; // Asegúrate de que la ruta sea correcta

const AdminAddVehicle: React.FC = () => {
  const { logout, token } = useContext(UserContext); // Obtener el token desde el contexto
  const router = useRouter();

  // Estado para el formulario y para controlar el círculo de carga
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    year: "",
    description: "",
    files: [] as File[], // Cambiado a 'files'
  });
  const [loading, setLoading] = useState(false); // Estado para el círculo de carga

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Verifica si el 'target' es un input de tipo 'file'
    if (name === "files" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files) {
        setFormData({
          ...formData,
          files: Array.from(files), // Convertir FileList a un array de File
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Activar el círculo de carga

    // Crear un FormData para enviar los archivos
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('version', formData.version);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('description', formData.description);

    // Agregar los archivos al FormData
    formData.files.forEach((file) => {
      formDataToSend.append('files', file); // Cambia 'files' si tu backend espera otro nombre
    });

    try {
      // Llamar a la función para subir el producto
      const success = await fetchPostProduct(formDataToSend, token); // Pasa el token
      if (success) {
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Vehículo agregado',
          text: 'El vehículo se ha subido correctamente.',
          confirmButtonText: 'Aceptar',
        });
        // Reinicia el formulario si lo deseas
        setFormData({
          name: "",
          version: "",
          year: "",
          description: "",
          files: [],
        });
      } else {
        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar el vehículo',
          text: 'Hubo un problema al agregar el vehículo. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      // Mostrar SweetAlert de error si ocurre una excepción
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Hubo un problema al agregar el vehículo. Intenta nuevamente.',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false); // Terminar el círculo de carga
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <h2 className="text-2xl md:text-4xl text-center font-semibold bg-white p-5 text-black w-full mb-6">
        Agregar vehículos
      </h2>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-md bg-[#222222] p-8 rounded-lg shadow-md">
        {/* Formulario */}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Campos de Entrada */}
          <label htmlFor="name" className="text-white">
            Nombre:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            placeholder="Toyota Corolla"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 text-white bg-[#222222] placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="version" className="text-white">
            Versión:
          </label>
          <input
            id="version"
            name="version"
            type="text"
            autoComplete="off"
            placeholder="XLI CVT"
            value={formData.version}
            onChange={handleChange}
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="year" className="text-white">
            Año:
          </label>
          <input
            id="year"
            name="year"
            type="text" // Cambiado a 'text' si el año es un string
            autoComplete="off"
            placeholder="2024"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          <label htmlFor="description" className="text-white">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción de vehículo"
            value={formData.description}
            onChange={handleChange}
            rows={4}  // Aumenta el número de filas para dar espacio
            className="w-full p-2 bg-[#222222] text-white placeholder:text-neutral-500 border border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white resize-none"
          />

          {/* Campos para Subir Archivos */}
          <label htmlFor="files" className="text-white">
            Archivos:
          </label>
          <input
            id="files"
            name="files"
            type="file"
            accept="*/*" // Aceptar cualquier tipo de archivo
            onChange={handleChange}
            multiple
            className="w-full p-2 border text-white bg-[#222222] border-gray-300 rounded focus:outline-none focus:bg-[#222222] focus:text-white"
          />

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#D9D9D9] text-black rounded hover:bg-gray-300 transition-colors"
            disabled={loading} // Desactiva el botón mientras se está cargando
          >
            {loading ? "Cargando..." : "Agregar"}
          </button>
        </form>
      </div>
      <ConsultasClient />

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
