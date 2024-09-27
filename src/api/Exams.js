import { FetchWithIntercept } from "./Intercept";

export async function getExams() {
    const exam = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/exam?filtered=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (exam.examen === 'No se pudo obtener los examenes') return null;
    return exam.examen
}
export async function createExamenUsuario(exam_user) {
    const exam = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user_examenes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exam_user),
    });
    console.log(exam)
    if (exam.examen_user === 'No se pudo crear el examen') return null;
    return exam.examen_user
}

export async function getExamenUsuario(id) {
    const exam = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user_examenes/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (exam.examen_user === 'No se pudo obtener los examenes') return null;
    return exam.examen_user
}

export async function deleteExamenUsuario(id_user, id_examen) {
    const exam = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user_examenes/${id_user}/${id_examen}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (exam.examen_user === 'No se pudo eliminar el examen') return null;
    return exam.examen_user

}