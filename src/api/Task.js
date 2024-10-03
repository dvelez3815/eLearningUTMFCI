import { FetchWithIntercept } from "./Intercept";

export async function getTasks() {

  const task = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/task/`, {
    method: "GET",
    headers: {},
  })
  return task
}
export async function getTask(id_task) {

  const task = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/task/info/${id_task}`, {
    method: "GET",
    headers: {},
  })
  return task
}