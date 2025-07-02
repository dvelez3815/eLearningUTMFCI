import { FetchWithIntercept } from "./Intercept";

export async function getProgress(userid) {
  const progress = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/progress/${userid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return progress;
}

export async function updateProgressBook(userid, book_id) {
  const progress = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/progress/update/book/${userid}/${book_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return progress;
}
export async function updateProgress(data) {

  const dataT = await FetchWithIntercept(process.env.REACT_APP_API_URL + "/progress/update",
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

export async function getVerifyCompleteProgress(_id) {

  const verify = await FetchWithIntercept(process.env.REACT_APP_API_URL + "/progress/verify/" + _id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  if (verify.verify === "Not found") return null
  return verify.verify ;
}
