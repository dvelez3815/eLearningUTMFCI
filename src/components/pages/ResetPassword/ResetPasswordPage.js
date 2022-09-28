import React, {useState} from "react";
import NavBar from "../../NavBar/NavBar";
import logo from "../../../assets/resource/Logo_Provicional.png"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { resetPassword } from "../../../api/User";
import { Confirmacion } from "../../Alert/Alerts";

const ResetPasswordPage = () => {

  const { id, token } = useParams();
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [cargando, setCargando] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(5, 'La contraseña debe tener 5 caracteres de longitud'),
    password2: Yup.string()
      .required('La contraseña es obligatoria')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const onSubmit = async (form) => {
    setCargando(true);
    const changePassword = await resetPassword({ id, token, password: form.password });
    setCargando(false);
    setIsVisibleDato("visible");
    switch (changePassword) {
      case "USER NOT EXIST":
        setDato("El usuario no existe en el sistema, por favor verifique su correo");
        return;
      case "TOKEN INVALID":
        setDato("El token ha expirado, por favor vuelva a solicitar el cambio de contraseña");
        return;
      case "PARAMS NOT FOUND":
        setDato("No se encontraron los parametros necesarios para cambiar la contraseña");
        return;
      case "SERVER ERROR":
        setDato("Hubo un problema al conectar con el servidor, por favor vuelva a intentarlo, si el problema persiste intente más tarde");
        return;
      default:
        break;
    }
 
    Confirmacion("Contraseña cambiada con exito", "La contraseña se ha cambiado con exito, ahora puede iniciar sesion con su nueva contraseña");
    window.location.href = "/signin";
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
                Restaura tu contraseña
              </h2>
            </div>
            <div className={isVisibleDato}>
              <h2 className="text-md text-red-500">{dato}</h2>
            </div>
            <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-2">
                <label
                  htmlFor="password"
                  className="form-label text-left block mb-2 text-gray-700"
                >
                  Nueva contraseña:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  required
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                {errors.password?.message && <span className="text-red-500 text-left block text-sm">{errors.password?.message}</span>}
              </div>
              <div className="form-group mb-2">
                <label
                  htmlFor="password2"
                  className="form-label text-left block mb-2 text-gray-700"
                >
                  Repite la nueva contraseña:
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  {...register("password2")}
                  autoComplete="current-password2"
                  required
                  className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                {errors.password2 && <span className="text-red-500 text-left block text-sm">{errors.password2?.message}</span>}
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


export default ResetPasswordPage;
