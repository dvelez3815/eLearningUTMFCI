import React, { useState, useRef } from "react";
import { registerUser } from '../../../api/User'
import logo from "../../../assets/resource/Logo_Provicional.png";
import img1 from "../../../assets/resource/sign.svg";
import Loading from "../../Loading/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import mod10 from 'mod10';
import Input from "../../Input/Input";
import ReCAPTCHA from "react-google-recaptcha"

const SignUpPage = () => {

  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const captchaRef = useRef(null)

  Yup.addMethod(Yup.string, "numberCedula", function (errorMessage) {
    return this.test(`test-number-cedula`, errorMessage, function (value) {
      const { path, createError } = this;
      return (
        mod10(parseInt(value)) ||
        createError({ path, message: errorMessage })
      );
    });
  });

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
    cedula: Yup.string().numberCedula('La cedula no es valida').required('Campo requerido'),
    name: Yup.string().required('Campo requerido'),
    lastname: Yup.string().required('Campo requerido'),
    mail: Yup.string().email('El correo no es valido').emailUTM('Usuario institucional existente').required('Campo requerido'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(5, 'La contraseña debe tener 5 caracteres de longitud'),
    password2: Yup.string()
      .required('La contraseña es obligatoria')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const togglePassword = () => {
    setMostrarPassword(!mostrarPassword);
  };


  const onSubmit = async (data) => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    setCargando(true);
    const user = await registerUser(data, token);
    setCargando(false);
    if (user === "TOKEN INVALID") {
      setIsVisibleDato("visible");
      setDato("Verifique que no sea un robot");
      return;
    }
    if (user === "USER EXITS") {
      setIsVisibleDato("visible");
      setDato("El usuario ya existe");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
    window.location.href = "./dashboard";
    console.log(data)

  }

  return (
    <div className=" ">
      <div className="md:flex h-screen">
        <div className=" lg:w-1/2 md:w-screen">
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
                  Registro
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  O
                  <Link
                    to="/signin"
                    className="font-medium ml-2 text-green-600 hover:text-green-500"
                  >
                    Iniciar sesión
                  </Link>
                </p>
                <div>
                  <h3 className="font-bold py-2 lg:text-xs md:text-xs text-sm   font-sans text-gray-500 ">
                    Si perteneces a la UTM, puedes iniciar sesión con tú
                    cuenta institucional @utm.edu.ec
                  </h3>
                </div>
              </div>
              <div className={isVisibleDato}>
                <h2 className="text-md text-red-500">{dato}</h2>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group mb-2">
                      <Input label="CI o Pasaporte: " id="cedula" type="number" name="cedula" errors={errors} register={register("cedula")} />
                    </div>
                    <div className="form-group mb-2">
                      <Input label="Nombres: " id="name" type="text" name="name" errors={errors} register={register("name")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group mb-2">
                      <Input label="Apellidos: " id="lastname" type="text" name="lastname" errors={errors} register={register("lastname")} />
                    </div>
                    <div className="form-group mb-2">
                      <Input label="Correo electrónico: " id="mail" type="email" name="mail" errors={errors} register={register("mail")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group mb-2 relative ">
                      <Input label="Contraseña: " id="password" mostrarPassword={mostrarPassword} togglePassword={togglePassword} type="password" name="password" errors={errors} register={register("password")} />
                    </div>
                      <div className="form-group mb-2 relative">
                        <Input label="Repite la contraseña: " id="password2" mostrarPassword={mostrarPassword} togglePassword={togglePassword} type="password" name="password2" errors={errors} register={register("password2")} />
                      </div>
                  </div>
                </div>
                {cargando && (
                  <Loading />
                )}
                <div className="flex items-center justify-center mb-4">
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    ref={captchaRef}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={cargando}
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
                    Registrar
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 hidden md:block ">
          <div className="min-h-screen flex-col flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div>
              <img src={img1} width="400" alt="aprende ingles"></img>
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
    </div>
  );
}




export default SignUpPage
