import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import logo from "../../../assets/resource/Logo_Provicional.png"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { sendEmailForgottenPassword } from "../../../api/User";
import Loading from "../../Loading/Loading";
import { Confirmacion } from "../../Alert/Alerts";
const ForgottenPasswordPage = () => {

  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [cargando, setCargando] = useState(false);

  Yup.addMethod(Yup.string, "emailUTM", function (errorMessage) {
    return this.test(`test-email-utm`, errorMessage, function (value) {
      const { path, createError } = this;
      return (
        !value.includes('@utm.edu.ec') ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const formSchema = Yup.object().shape({
    mail: Yup.string().email('El correo no es valido').emailUTM('Cambie su contraseña en su sistema institucional').required('Campo requerido'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const onSubmit = async (form) => {
    setCargando(true);
    let { mail } = form;
    const send_mail = await sendEmailForgottenPassword({ mail });
    setCargando(false);
    setIsVisibleDato("visible");
    switch (send_mail) {
      case "USER NOT EXIST":
        setDato("El usuario no existe en el sistema, por favor verifique su correo");
        return;
      case "SERVER ERROR":
        setDato("Hubo un problema al conectar con el servidor, por favor vuelva a intentarlo, si el problema persiste intente más tarde");
        return;
      default:
        break;
    }
    Confirmacion("Correo enviado", `Se ha enviado un correo a su cuenta de correo electronico ${mail}, por favor verifique su bandeja de entrada`);
  }

  return (
    <div>
      <NavBar ocultar="invisible"></NavBar>
      <div className="container mx-auto w-screen ">
        <div className="min-h-full flex-col flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-6">
            <div>
              <img
                className="mx-auto md:h-16 lg:h-16 sm:h-16 w-auto"
                src={logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Recupera tu contraseña
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                O
                <Link
                  to="/signin"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
            <div className={isVisibleDato}>
              <h2 className="text-md text-red-500">{dato}</h2>
            </div>
            <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-2">
                <label
                  htmlFor="email-address"
                  className="form-label text-left block mb-2 text-gray-700"
                >
                  Correo electrónico:
                </label>
                <input
                  id="email-address"
                  name="mail"
                  type="email"
                  {...register("mail")}
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  autoComplete="email"
                  required
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                {errors.mail?.message && <span className="text-red-500 text-left block text-sm">{errors.mail?.message}</span>}
              </div>
              {cargando && (
                <Loading />
              )}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-yellow-400"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-yellow-600 group-hover:text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ForgottenPasswordPage;
