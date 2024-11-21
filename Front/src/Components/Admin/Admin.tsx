"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UserContext } from "@/Context/contextUser";
import { fetchPostProduct } from "@/utils/FetchCars/FetchCars";
import { IConsulta } from "@/Interfaces/Interface";
import { fetchGetConsultas, fetchDeleteConsulta } from "@/utils/FetchCon/FetchCon"; // Asegúrate de que la ruta es correcta

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
  const [inquiries, setInquiries] = useState<IConsulta[]>([]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "files" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files) {
        setFormData({ ...formData, files: Array.from(files) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("version", formData.version);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("description", formData.description);

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const success = await fetchPostProduct(formDataToSend, token);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Vehículo agregado",
          text: "El vehículo se ha subido correctamente.",
          confirmButtonText: "Aceptar",
        });
        setFormData({ name: "", version: "", year: "", description: "", files: [] });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al agregar el vehículo",
          text: "Hubo un problema al agregar el vehículo. Intenta nuevamente.",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un problema al agregar el vehículo. Intenta nuevamente.",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cargar las consultas al montar el componente
  useEffect(() => {
    const fetchConsultas = async () => {
      if (token) {
        try {
          const data = await fetchGetConsultas(token);
          setInquiries(data);
        } catch (error) {
          console.error("Error al obtener las consultas:", error);
        }
      }
    };

    fetchConsultas();
  }, [token]); // Aseguramos que token esté en el array de dependencias

  // Manejar la eliminación de consultas
  const handleDeleteInquiry = async (id: string) => {
    if (!token) {
      Swal.fire("Error", "No se ha encontrado el token de autenticación", "error");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la consulta permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Llamamos a la función para eliminar la consulta
          await fetchDeleteConsulta(id, token);
          setInquiries(inquiries.filter((inquiry) => inquiry._id !== id)); // Actualizamos el estado
          Swal.fire("Eliminado!", "La consulta ha sido eliminada.", "success");
        } catch (error) {
          Swal.fire("Error", "Hubo un error al eliminar la consulta.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-800 p-12 text-white mt-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Panel de Administración</h1>
          <p className="mt-2 text-lg">Gestiona vehículos, consultas y más.</p>
        </div>

        {/* Contenedor principal */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario Agregar Vehículo */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-semibold mb-6">Agregar Vehículo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre del vehículo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="version" className="block text-sm font-medium mb-2">
                  Versión
                </label>
                <input
                  type="text"
                  id="version"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-2">
                  Año
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="files" className="block text-sm font-medium mb-2">
                  Imágenes del vehículo
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Agregar Vehículo"}
              </button>
            </form>
          </div>

          {/* Consultas */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-semibold mb-6">Consultas de Clientes</h2>
            <div className="overflow-y-auto max-h-80">
              <ul>
                {inquiries.map((inquiry) => (
                  <li
                    key={inquiry._id}
                    className="flex justify-between items-center border-b py-4 px-6 mb-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold">{inquiry.nombre}</p>
                      <p className="text-sm text-gray-500">{inquiry.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteInquiry(inquiry._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Botón de Cerrar sesión */}
        <div className="mt-12 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddVehicle;
