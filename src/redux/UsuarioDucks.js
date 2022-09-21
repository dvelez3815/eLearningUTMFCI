import axios from "axios";
/* constains */

const dataInicial = {
  array: [],
  offset: 0,
  login: null, 
};
/* Types */
const OBTENER_USUARIO_EXITO = "OBTENER_USUARIO_EXITO";
const SIGUIENTE_USUARIO_EXITO = "SIGUIENTE_USUARIO_EXITO"
const LOGIN_USUARIO_EXITO = "LOGIN_USUARIO_EXITO"

/* reducers  */

export default function userReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_USUARIO_EXITO:
      return {
        ...state,
        array: action.payload,
      };
       case SIGUIENTE_USUARIO_EXITO:
      return {
        ...state,
        array: action.payload.array,
        offset: action.payload.offset,
      }; 
    case LOGIN_USUARIO_EXITO:
        return {
            ...state,
            login: action.payload.login,
        }
    default:
      return state;
  }
}

/* actions */
export const loginAction = (params) => async (dispatch, getState) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
            method: "POST",
            body: JSON.stringify({
              mail: params.mail.toLowerCase(),
              password: params.password,
            }),
            headers: {
              "Content-Type": "application/json",
              token: process.env.REACT_APP_SECRET_TOKEN,
            },
          });
        const {res:user} = await response.json();
        console.log(user);
        dispatch({
            type: LOGIN_USUARIO_EXITO,
            payload: {
              login: user,
            }
          });
    }catch(error){
        console.log(error)
    }

}
export const obtenerUserAccion = (id) => async (dispatch, getState) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/progress/${id}`, {
          method: "POST",
          headers: {
              'token': process.env.REACT_APP_SECRET_TOKEN
          },
      });
      const dataP = await response.json();
      console.log(dataP);
      dispatch({
          type: OBTENER_USUARIO_EXITO,
          payload: dataP,
      });
  } catch (error) {
    console.log(error);
  }
};

/* export const siguienteUSUARIOAccion = (numero) => async (dispatch, getState) => {

  const { offset } = getState().USUARIOes;
  const siguiente = offset + numero;
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/USUARIO?offset=${siguiente}&limit=20`
    );
    dispatch({
      type: SIGUIENTE_USUARIO_EXITO,
      payload: {
        array: res.data.results,
        offset: siguiente,
      }
    });

  } catch (error) {
    console.log(error);
  }
}
 */