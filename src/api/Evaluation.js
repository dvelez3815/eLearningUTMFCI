export const getPruebaGeneral = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/evaluation/`, {
        method: 'GET',
        headers: {
            'token': process.env.REACT_APP_SECRET_TOKEN,
        },
    });
    const data = await response.json();

    return data;
}