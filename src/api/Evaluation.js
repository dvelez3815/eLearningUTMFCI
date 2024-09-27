import { FetchWithIntercept } from "./Intercept";

export const getPruebaGeneral = async () => {
    const data = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/evaluation/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
}