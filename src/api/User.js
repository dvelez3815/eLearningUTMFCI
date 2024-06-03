import { omit } from 'underscore';

export async function  loginUser(params, token){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
        method: "POST",
        body: JSON.stringify({
          mail: params.mail.toLowerCase(),
          password: params.password,
          token: token
        }),
        headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_SECRET_TOKEN,
        },
      });
    const {res:user} = await response.json();
    return user;
}
export async function sendEmailForgottenPassword({mail, token}){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/forgottenPassword/`, {
    method: "POST",
    body:JSON.stringify({
      mail: mail,
      tokenRC: token
    }),
    headers: {
      "Content-Type": "application/json",
      token: process.env.REACT_APP_SECRET_TOKEN,
    },
  });
const {res:user} = await response.json();
return user;

}

export async function resetPassword({id, token, password}){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/restart-password`, {
    method: "POST",
    body: JSON.stringify({
      id,
      token,
      password
    }),
    headers: {
      "Content-Type": "application/json",
      token: process.env.REACT_APP_SECRET_TOKEN,
    },
  });
const {res:user} = await response.json();
return user;

}
export async function  registerUser(params, token){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify({usuario: omit(params, ['password2']), tokenRC: token}),
        headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_SECRET_TOKEN,
        },
      });
      const {res:user} = await response.json();
      return user;

}

export async function getUsers() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_SECRET_TOKEN,
      },
  });
  const user = await response.json();
  return JSON.parse(user.user)
}

export async function getUser(id) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_SECRET_TOKEN,
      },
  });
  const user = await response.json();
  return user
}