"use client";

import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "@/Context/contextUser";
import { fetchPostProduct } from "@/utils/FetchCars/FetchCars";
import { compressImage } from "@/utils/compressImage";
import { buildDescription } from "@/utils/parseVehicleDescription";

const inputClass =
  "w-full px-4 py-3 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-transparent transition text-sm";

const labelClass = "block text-sm text-gray-300 mb-1.5";

const AddVehicle: React.FC = () => {
  const { token } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    precio: "",
    year: "",
    notas: "",
    files: [] as File[],
    // specs
    version: "",
    motor: "",
    combustible: "",
    potencia: "",
    transmision: "",
    traccion: "",
    autonomia: "",
    velocidadMax: "",
    largo: "",
    ancho: "",
    alto: "",
    tanque: "",
    baul: "",
  });
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "files" && e.target instanceof HTMLInputElement) {
      const rawFiles = e.target.files ? Array.from(e.target.files) : [];
      if (rawFiles.length === 0) return;

      setCompressing(true);
      setPreviews([]);
      setFormData((prev) => ({ ...prev, files: [] }));

      try {
        const compressed = await Promise.all(rawFiles.map(compressImage));
        const urls = compressed.map((f) => URL.createObjectURL(f));
        setFormData((prev) => ({ ...prev, files: compressed }));
        setPreviews(urls);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error al procesar imágenes",
          text: "No se pudieron comprimir algunas imágenes. Intentá nuevamente.",
          confirmButtonText: "Aceptar",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#B62E30",
        });
      } finally {
        setCompressing(false);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const specs = {
      version: formData.version,
      motor: formData.motor,
      combustible: formData.combustible,
      potencia: formData.potencia,
      transmision: formData.transmision,
      traccion: formData.traccion,
      autonomia: formData.autonomia,
      velocidadMax: formData.velocidadMax,
      largo: formData.largo,
      ancho: formData.ancho,
      alto: formData.alto,
      tanque: formData.tanque,
      baul: formData.baul,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("version", formData.precio);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("description", buildDescription(specs, formData.notas));
    formData.files.forEach((file) => formDataToSend.append("files", file));

    try {
      const success = await fetchPostProduct(formDataToSend, token);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Vehículo agregado",
          text: "El vehículo se ha subido correctamente.",
          confirmButtonText: "Aceptar",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#B62E30",
        });
        setFormData({
          name: "", precio: "", year: "", notas: "", files: [],
          version: "", motor: "", combustible: "", potencia: "", transmision: "",
          autonomia: "", velocidadMax: "", largo: "", ancho: "",
          alto: "", tanque: "", baul: "",
        });
        setPreviews([]);
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al agregar",
        text: "Hubo un problema al subir el vehículo. Intentá nuevamente.",
        confirmButtonText: "Aceptar",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#B62E30",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-1">Agregar Vehículo</h2>
      <p className="text-gray-400 text-sm mb-6">
        Completá los datos y subí las fotos del nuevo vehículo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Volkswagen Nivus"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Precio</label>
            <input
              type="text"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej: $15.000.000"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Año</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ej: 2023"
            className={inputClass}
            required
          />
        </div>

        {/* Especificaciones técnicas */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-sm font-semibold uppercase tracking-wide">
              Especificaciones técnicas
            </span>
            <div className="flex-1 h-[1px] bg-[#505050]" />
          </div>

          <div className="mb-4">
            <label className={labelClass}>Versión del Vehículo</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="Ej: Highline 1.4 TSI DSG"
              className={inputClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Combustible</label>
              <select
                name="combustible"
                value={formData.combustible}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">— Sin especificar —</option>
                <option value="Nafta">Nafta</option>
                <option value="Diesel">Diesel</option>
                <option value="GNC">GNC</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Motor</label>
              <input
                type="text"
                name="motor"
                value={formData.motor}
                onChange={handleChange}
                placeholder="Ej: 1.4 TSI 150 CV"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Potencia</label>
              <input
                type="text"
                name="potencia"
                value={formData.potencia}
                onChange={handleChange}
                placeholder="Ej: 150 CV"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Transmisión</label>
              <input
                type="text"
                name="transmision"
                value={formData.transmision}
                onChange={handleChange}
                placeholder="Ej: Automática 6 vel."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tracción</label>
              <select
                name="traccion"
                value={formData.traccion}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">— Sin especificar —</option>
                <option value="Delantera">Delantera</option>
                <option value="Trasera">Trasera</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Autonomía Estimada</label>
              <input
                type="text"
                name="autonomia"
                value={formData.autonomia}
                onChange={handleChange}
                placeholder="Ej: 600 km"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Velocidad Máxima</label>
              <input
                type="text"
                name="velocidadMax"
                value={formData.velocidadMax}
                onChange={handleChange}
                placeholder="Ej: 200 km/h"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Largo</label>
              <input
                type="text"
                name="largo"
                value={formData.largo}
                onChange={handleChange}
                placeholder="Ej: 4.26 m"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Ancho</label>
              <input
                type="text"
                name="ancho"
                value={formData.ancho}
                onChange={handleChange}
                placeholder="Ej: 1.77 m"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Alto</label>
              <input
                type="text"
                name="alto"
                value={formData.alto}
                onChange={handleChange}
                placeholder="Ej: 1.53 m"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Capacidad del Tanque</label>
              <input
                type="text"
                name="tanque"
                value={formData.tanque}
                onChange={handleChange}
                placeholder="Ej: 50 L"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Capacidad del Baúl</label>
              <input
                type="text"
                name="baul"
                value={formData.baul}
                onChange={handleChange}
                placeholder="Ej: 300 L"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Descripción / Notas</label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            placeholder="Kilometraje, estado, extras, equipamiento..."
            className={inputClass}
            rows={4}
          />
        </div>

        <div>
          <label className={labelClass}>Imágenes</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#505050] rounded-lg cursor-pointer hover:border-[#B62E30] transition-colors bg-[#1a1a1a]">
            <div className="flex flex-col items-center justify-center gap-1 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm">
                {formData.files.length > 0
                  ? `${formData.files.length} imagen(es) seleccionada(s)`
                  : "Hacé clic para subir imágenes"}
              </span>
              <span className="text-xs text-gray-600">PNG, JPG, WEBP (múltiples)</span>
            </div>
            <input
              type="file"
              name="files"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {compressing && (
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Comprimiendo imágenes...
            </div>
          )}
          {!compressing && previews.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {previews.map((url, i) => (
                <div key={i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`preview ${i + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-[#505050]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-1.5 -right-1.5 bg-[#B62E30] hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none shadow"
                    aria-label="Eliminar imagen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || compressing}
          className="w-full py-3 bg-[#B62E30] hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subiendo...
            </span>
          ) : compressing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Comprimiendo imágenes...
            </span>
          ) : (
            "Agregar Vehículo"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
