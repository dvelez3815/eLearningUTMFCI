export async function getTasks(){
     
    const taksresponse = await fetch(`${process.env.REACT_APP_API_URL}/task/`, {
        method: "GET",
        headers: {
          token: process.env.REACT_APP_SECRET_TOKEN,
        },
      })
  
      const task = await taksresponse.json();
      return task
}