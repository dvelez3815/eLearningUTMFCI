import { getProgress } from "../api/Progress";

const dataInicial = {
    array: [],
  };


  const OBTENER_PROGRESO_EXITO = "OBTENER_PROGRESO_EXITO";


export default function progressReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PROGRESO_EXITO:
            return {
                ...state,
                array: action.payload,
            };

        default:
            return state;
    }
}


export const obtenerProgresoAccion = (id) => async (dispatch, getState) => {
    try {
        const progress = await getProgress(id);
        dispatch({
            type: OBTENER_PROGRESO_EXITO,
            payload: progress,
        });
    } catch (error) {
      console.log(error);
    }
  };