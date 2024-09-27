import React, { useState, useRef, useContext } from "react";
import logo from "../../../assets/resource/LOGO_ILM_HORIZONTAL.png";
import logo_UTM from "../../../assets/resource/LOGO_SIMPLE_BG.png";
/* import img1 from "../../../assets/resource/sign.svg"; */
import "./SigInPage.css";
import loading from "../../../assets/resource/loading.svg";
import { loginUser } from '../../../api/User'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import Input from "../../Input/Input";
import ReCAPTCHA from "react-google-recaptcha"
import { AuthContext } from '../../../context/AuthContext.js'
/* import { Navigate } from "react-router-dom"; */

const SigInPage = () => {
  const { login, user } = useContext(AuthContext);
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const captchaRef = useRef(null)

  const formSchema = Yup.object().shape({
    mail: Yup.string().email('El correo no es valido').required('Campo requerido'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const togglePassword = () => {
    setMostrarPassword(!mostrarPassword);
  };



  const onSubmit = async (form) => {
    setCargando(true);
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    const user = await loginUser(form, token);
    setIsVisibleDato("visible");
    setCargando(false);
    switch (user) {
      case "TOKEN INVALID":
        setDato("Verifique que no sea un robot");
        return;
      case "USER NOT EXIST UTM":
        setDato("El usuario no existe en el sistema, por favor verifique su correo UTM");
        return;
      case "USER NOT EXIST":
        setDato("El usuario no existe en el sistema, por favor verifique su correo");
        return;
      case "CREDENCIALES INCORRECTAS":
        setDato("La contraseña es incorrecta");
        return;
      case "SERVER ERROR":
        setDato("Hubo un problema al conectar con el servidor, por favor vuelva a intentarlo, si el problema persiste intente más tarde");
        return;
      default:
        break;
    }
    login({ ...user });
    window.location.href = "/dashboard"
    return;
  };

  if (user) return window.location.href = "/dashboard";
  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <div className="flex flex-1 justify-center items-center ">
        <div className=" flex items-center justify-center  lg:w-1/3">
          <div className="w-full space-y-2">
            <div>
              <Link to="/">
                <img
                  className="mx-auto md:h-22 lg:h-22 sm:h-22 h-24 w-auto"

                  src={logo}
                  alt="Workflow"
                />
              </Link>
              <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                Inicia sesión
              </h2>

            </div>
            <div className={isVisibleDato}>
              <h2 className="text-md text-red-500">{dato}</h2>
            </div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} >
              <input type="hidden" name="remember" value="true" />
              <div className="form-group mb-2">
                <Input label="Correo electrónico: " id="mail-address" type="email" name="mail" errors={errors} register={register("mail")} />
              </div>
              <div className=" form-group mb-2 relative">
                <Input label="Contraseña: " id="password" mostrarPassword={mostrarPassword} togglePassword={togglePassword} type="password" name="password" errors={errors} register={register("password")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900">
                    Recuerdame
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="https://app.utm.edu.ec/sga/"
                    target="blank"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Olvidaste tu contraseña?
                  </ a>
                </div>
              </div>
              {cargando && (
                <img src={loading} width="50" alt="cargando"></img>
              )}
              <div className="flex items-center justify-center">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                />
              </div>
              <div>
                <button type="submit"
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
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-24 hidden lg:block md:block -left-40 p-4 opacity-30">
        <img src={logo_UTM} alt="Marca de agua" className="h-96" />
      </div>
    </div>
  );
};

export default SigInPage;
