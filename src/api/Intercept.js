export const FetchWithIntercept = async (url, options = {}) => {
    const token = localStorage.getItem('token') || process.env.REACT_APP_SECRET_TOKEN;

    const headers = {
        ...options.headers,
        token: token,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });
    // Manejo de errores y parseo de la respuesta
    if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    return response.json();
};
