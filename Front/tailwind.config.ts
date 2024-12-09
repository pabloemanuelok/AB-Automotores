import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
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