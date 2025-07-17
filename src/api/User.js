import { omit } from 'underscore';
import { FetchWithIntercept } from './Intercept';

export async function loginUser(params) {
  const { res: user, token } = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      mail: params.mail.toLowerCase(),
      password: params.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {user, token};
}
export async function sendEmailForgottenPassword({ mail, token }) {
  const { res: user } = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/forgottenPassword/`, {
    method: "POST",
    body: JSON.stringify({
      mail: mail,
      tokenRC: token
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return user;

}

export async function resetPassword({ id, token, password }) {
  const { res: user } = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/restart-password`, {
    method: "POST",
    body: JSON.stringify({
      id,
      token,
      password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return user;

}
export async function registerUser(params, token) {
  const  { res: user }  = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/signup`, {
    method: "POST",
    body: JSON.stringify({ usuario: omit(params, ['password2']), tokenRC: token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return user;

}

export async function getUsers() {
  const user = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return JSON.parse(user.user)
}

export async function getUser(id) {
  const user = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return user
}


export async function getUserByCedula(cedula) {
  const user = await FetchWithIntercept(`${process.env.REACT_APP_API_URL}/user/cedula/${cedula}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (user.user === 'User Not Exist') return null;
  return user.user
}