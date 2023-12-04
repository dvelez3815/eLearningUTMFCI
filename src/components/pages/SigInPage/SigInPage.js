import React, { useState, useRef  } from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";
import img1 from "../../../assets/resource/sign.svg";
import "./SigInPage.css";
import Loading from "../../Loading/Loading";
import { loginUser } from '../../../api/User'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { mostrarAlertaLogin } from '../../Alert/Alerts';
import { Link } from "react-router-dom";
import Input from "../../Input/Input";
import ReCAPTCHA from "react-google-recaptcha"

const SigInPage = () => {
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
      case "PASSWORD INCORRECT":
        setDato("La contraseña es incorrecta");
        return;
      case "SERVER ERROR":
        setDato("Hubo un problema al conectar con el servidor, por favor vuelva a intentarlo, si el problema persiste intente más tarde");
        return;
      default:
        break;
    }
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
    window.location.href = "./dashboard";
  };
  return (
    <div className=" ">
      <div className="md:flex h-screen ">
        <div className="lg:w-1/3 md:w-screen ">
          <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-2">
              <div>
                <Link to="/">
                  <img
                    className="mx-auto md:h-16 lg:h-16 sm:h-16 w-auto"

                    src={logo}
                    alt="Workflow"
                  />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Inicia sesión
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  O
                  <Link
                    to="/signup"
                    className="font-medium m-2 text-green-600 hover:text-green-500"
                  >
                    Registrate
                  </Link>
                </p>
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
                  <Input label="Contraseña: " id="password" mostrarPassword={mostrarPassword} togglePassword={togglePassword} type="password" name="password" errors={errors} register={register("password")}/>
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
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Recuerdame
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgotten-password"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Olvidaste tu contraseña?
                    </ Link>
                  </div>
                </div>
                {cargando && (
                  <Loading />
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
        <div className="bg-gray-50 lg:w-2/3 hidden md:block ">
          <div className="min-h-screen flex-col flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
            <div>
              <img src={img1} width="400" alt="aprende"></img>
            </div>
            <div>
              <h3 className="text-lg p-2 font-semibold italic">
                Aprender otro idioma es como convertirse en otra persona,
                <br />
                <span className="text-gray-500 font-normal italic">
                  Haruki Murakami
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <script>
        {window.onload = function () {
          const saved = localStorage.getItem("user");
          if (saved) {
            mostrarAlertaLogin();
          }
        }}
      </script>
    </div>
  );
};

export default SigInPage;
