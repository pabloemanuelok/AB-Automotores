import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  purge: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Asegúrate de incluir estas rutas
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Asegúrate de incluir estas rutas
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        titillium: [`var(--font-titillium)`],
      },
      colors: {
        RojoAb: "var(--RojoAb)",  // Colores personalizados basados en variables CSS
        Negro: "var(--Negro)",
        grisAb: "var(--grisAb)",
        grisBorde: "var(--grisBorde)",  // Corregido aquí
      },
    },
  },
  plugins: [],
};

export default config;
