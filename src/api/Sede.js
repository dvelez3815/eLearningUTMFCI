import { FetchWithIntercept } from "./Intercept";

export async function getSedes() {
    const sede = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/sede?filtered=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (sede.sede === 'No se pudo obtener las sedes') return null;
    return sede.sede;
}