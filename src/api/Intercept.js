export const FetchWithIntercept = async (url, options = {}) => {
    const token = localStorage.getItem('token') || ''
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
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = '/'
    }
    return response.json();
};