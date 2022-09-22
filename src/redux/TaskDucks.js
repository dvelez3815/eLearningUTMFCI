const dataInicial = {
    array: [],
};


const OBTENER_TASK_EXITO = "OBTENER_TASK_EXITO";


export default function taskReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_TASK_EXITO:
            return {
                ...state,
                array: action.payload,
            };

        default:
            return state;
    }
}



export const obtenerTaskAccion = () => async (dispatch, getState) => {
    try {
        const taksresponse = await fetch(`${process.env.REACT_APP_API_URL}/task/`, {
            method: "GET",
            headers: {
              token: process.env.REACT_APP_SECRET_TOKEN,
            },
          })
      
          const task = await taksresponse.json();
        dispatch({
            type: OBTENER_TASK_EXITO,
            payload: task,
        });
    } catch (error) {
      console.log(error);
    }
  };