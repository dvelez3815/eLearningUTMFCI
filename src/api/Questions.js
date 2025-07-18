import { FetchWithIntercept } from "./Intercept";

export async function getQuestions(taskid) {

    const url = `${process.env.REACT_APP_API_URL}/task/${taskid}`;
    const data = await FetchWithIntercept(url,
        {
            method: 'GET',
            headers: {},
        });
    return data;

}

export async function getQuestionsOfBooks(idlibro) {
    const data = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/book/books/${idlibro}`, {
        method: 'GET',
        headers: {},
    });
    return data;
}

export const getQuestionForReview = async (book, modulo, unit, tipo) => {
    const data = await FetchWithIntercept(
        `${process.env.REACT_APP_API_URL}/question/review/${book}/${modulo}/${unit}/${tipo}`,
        {
            method: "GET",
            headers: {},
        }
    );

    return data;
};
export const getImageOfQuestion = async (img) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/question/image/${img}`);
    return response.ok ? response : null;
}

export const getAudioOfQuestion = async (audio) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/question/audio/${audio}`);
    return response.ok ? response : null;
}