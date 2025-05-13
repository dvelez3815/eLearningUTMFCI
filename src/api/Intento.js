import { FetchWithIntercept } from './Intercept';

export async function guardarIntento(data) {

    const dataT = await FetchWithIntercept(process.env.REACT_APP_API_URL + "/intento",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    return dataT;
}