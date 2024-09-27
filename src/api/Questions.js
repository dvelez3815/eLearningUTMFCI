
export async function getQuestions(taskid) {

    const url = `${process.env.REACT_APP_API_URL}/task/${taskid}`;
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'token': process.env.REACT_APP_SECRET_TOKEN,
            },
        });
    const data = await response.json();
    return data;

}

export async function getQuestionsOfBooks(idlibro) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/book/books/${idlibro}`, {
        method: 'GET',
        headers: {
            'token': process.env.REACT_APP_SECRET_TOKEN,
        },
    });
    const data = await response.json();
    return data;
}

export const getQuestionForReview = async (book, modulo, unit, tipo) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/question/review/${book}/${modulo}/${unit}/${tipo}`,
        {
            method: "GET",
            headers: {
                token: process.env.REACT_APP_SECRET_TOKEN,
            },
        }
    );

    const data = await response.json();
    return data;
};
export const getImageOfQuestion = async (img) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/question/image/${img}`, {
        headers: {
            token: process.env.REACT_APP_SECRET_TOKEN,
        }
    });
    return response.ok || null;
}

export const getAudioOfQuestion = async (audio) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/question/audio/${audio}`,
        {
            headers: {
                token: process.env.REACT_APP_SECRET_TOKEN,
            }
        }
    );

    return response.ok || null;
}