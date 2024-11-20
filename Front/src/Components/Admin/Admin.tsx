"use client";

import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import ConsultasClient from "./ConsultasClient/ConsultasClient";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import { fetchPostProduct } from "@/utils/FetchCars/FetchCars";

const AdminAddVehicle: React.FC = () => {
  const { logout, token } = useContext(UserContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    version: "",
    year: "",
    description: "",
    files: [] as File[],
  });
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "files" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files) {
        setFormData({
          ...formData,
          files: Array.from(files),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('version', formData.version);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('description', formData.description);

    formData.files.forEach((file) => {
      formDataToSend.append('files', file);
    });

    try {
      const success = await fetchPostProduct(formDataToSend, token);
      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Vehículo agregado',
          text: 'El vehículo se ha subido correctamente.',
          confirmButtonText: 'Aceptar',
        });
        setFormData({
          name: "",
          version: "",
          year: "",
          description: "",
          files: [],
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar el vehículo',
          text: 'Hubo un problema al agregar el vehículo. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Hubo un problema al agregar el vehículo. Intenta nuevamente.',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center bg-gradient-to-r from-[#111111] via-[#333333] to-[#555555] min-h-screen p-4 mt-4">
      {/* Formulario de agregar vehículo */}
      <div className="w-full sm:w-[45%] bg-[#222222] p-8 rounded-lg shadow-xl border border-gray-800">
        <h2 className="text-3xl md:text-4xl text-center font-semibold text-yellow-400 p-5 mb-6 bg-opacity-20 border-b-2 border-yellow-400 w-full">
          Agregar vehículo
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-yellow-400">Nombre del vehículo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-yellow-400">Versión</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-yellow-400">Año</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-yellow-400">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-yellow-400">Imágenes</label>
            <input
              type="file"
              name="files"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-all"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Agregar"}
          </button>
        </form>
      </div>

      {/* Consultas del cliente */}
      <div className="w-full sm:w-[45%]">
        <ConsultasClient />
      </div>

      <div className="mt-8 w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white hover:bg-red-500 transition-all font-bold py-2 px-6 rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default AdminAddVehicle;
