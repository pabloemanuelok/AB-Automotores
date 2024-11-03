// utils/FetchUsers/FetchUsers.ts
export const postLogin = async (credentials: { name: string; password: string }) => {
  try {
    const response = await fetch("https://ab-backend-iznbqeqe7a-uc.a.run.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text(); // Obtén el texto de error una vez
      throw new Error(`Error en la solicitud: ${errorText}`);
    }

    const data = await response.json(); // Lee el cuerpo de la respuesta como JSON
    return data;
  } catch (error) {
    console.error("Error en la función de postLogin:", error);
    throw new Error("Error en la solicitud"); // Retorna el error para manejarlo en otro lugar
  }
};