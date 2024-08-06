export  async function getProgress (userid) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/progress/${userid}`, {
        method: "GET",
        headers: {
          'token': process.env.REACT_APP_SECRET_TOKEN
        },
      });
      const progress = await response.json();
      return progress;
}

export async function updateProgressBook (userid, book_id) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/progress/update/book/${userid}/${book_id}`, {
      method: "GET",
      headers: {
        'token': process.env.REACT_APP_SECRET_TOKEN
      },
    });
    const progress = await response.json();
    return progress;
}
export async function updateProgress(data) {

  const responses = await fetch(process.env.REACT_APP_API_URL + "/progress/update",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'token': process.env.REACT_APP_SECRET_TOKEN
      },
    }
  )
  const dataT = await responses.json();
  return dataT;
}

export async function getPorgressByMail(mail) {

  const responses = await fetch(process.env.REACT_APP_API_URL + "/progress/porcentaje/" + mail,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'token': process.env.REACT_APP_SECRET_TOKEN
      },
    }
  )
  const porcentaje = await responses.json();
  if(porcentaje.porcentaje === "Not found") return null
  return porcentaje.porcentaje;
}
