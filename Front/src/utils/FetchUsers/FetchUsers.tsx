interface ICredentials {
  name: string;
  password: string;
}

interface ILoginResponse {
  token: string; // Ejemplo
  // Otros campos según la respuesta de tu API
}

export const postLogin = async (credentials: ICredentials): Promise<ILoginResponse> => {
  try {
    // Verifica que BACKEND_URL esté definido
    if (!process.env.BACKEND_URL) {
      throw new Error("La URL del backend no está definida");
    }

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text(); // Obtén el texto de error
      throw new Error(`Error en la solicitud: ${errorText} (Código: ${response.status})`);
    }

    const data: ILoginResponse = await response.json(); // Lee el cuerpo de la respuesta como JSON
    return data;
  } catch (error) {
    console.error("Error en la función de postLogin:", error);
    throw new Error("Error en la solicitud"); // Retorna el error para manejarlo en otro lugar
  }
};
