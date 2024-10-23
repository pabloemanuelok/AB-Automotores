import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
