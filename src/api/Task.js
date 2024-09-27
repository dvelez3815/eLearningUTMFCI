import { FetchWithIntercept } from "./Intercept";

export async function getTasks() {

  const task = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/task/`, {
    method: "GET",
    headers: {},
  })
  return task
}