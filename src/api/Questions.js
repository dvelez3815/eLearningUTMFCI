
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