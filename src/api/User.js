import { omit } from 'underscore';

export async function  loginUser(params){
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
    return user;
}
export async function sendEmailForgottenPassword({mail}){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/forgottenPassword/${mail}`, {
    method: "GET",
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
export async function  registerUser(params){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify(omit(params, ['password2'])),
        headers: {
          "Content-Type": "application/json",
          token: process.env.REACT_APP_SECRET_TOKEN,
        },
      });
      const {res:user} = await response.json();
      return user;

}