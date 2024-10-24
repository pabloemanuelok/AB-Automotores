interface ICredentials {
  name: string;
  password: string;
}

export const postLogin = async (credentials: ICredentials) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text(); // Obtén el texto de error una vez
      throw new Error(`Error en la solicitud: ${errorText} (Código: ${response.status})`);
    }

    const data = await response.json(); // Lee el cuerpo de la respuesta como JSON
    return data;
  } catch (error) {
    console.error("Error en la función de postLogin:", error);
    throw new Error("Error en la solicitud"); // Retorna el error para manejarlo en otro lugar
  }
};
