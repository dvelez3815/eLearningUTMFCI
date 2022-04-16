import React, {useState } from "react";
import logo from "../../../assets/resource/Logo_Provicional.png";
import img1 from "../../../assets/resource/sign.svg";
import "./SigInPage.css";
import axios from "axios";
import Cookies from "universal-cookie";
import loading from "../../../assets/resource/loading.svg";
const cookies = new Cookies();

const SigInPage = () => {
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [form, setForm] = useState({});
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const handleButtonSubmit = async (event) => {
    event.preventDefault();
    //check it input type are correct

    setCargando(true);
    
    axios
      .post(process.env.REACT_APP_API_URL+"/user/signin", {
        mail: form.mail,
        password: form.password,
      },
      {
        headers: {
          'token': process.env.REACT_APP_SECRET_TOKEN
      }
      
    }).then((res) => {
        
        if (res.data.res=== "USER NOT EXIST") {
          setDato("El usuario no existe");
          setCargando(false);
          setIsVisibleDato("");
          setInterval(() => {
            setDato("");
            setIsVisibleDato("hidden");
          }, 20500);
        } else if (res.data.res === "PASSWORD INCORRECT") {
          setDato("La contraseña es incorrecta");
          setIsVisibleDato("");
          setCargando(false);
          setInterval(() => {
            setDato("");
            setIsVisibleDato("hidden");
          }, 20500);
        } else if(res.data.res === "ERROR"){
          setDato("Hubo un problema al conectar con el servidor, si el problema persiste intente más tarde");
          setIsVisibleDato("");
          setCargando(false);
          setInterval(() => {
            setDato("");
            setIsVisibleDato("hidden");
          }, 20500);          
        } else {
          cookies.set("_id", res.data.res._id, { path: "/" });
          cookies.set("name", res.data.res.name, { path: "/" });
          cookies.set("lastname", res.data.res.lastname, { path: "/" });
          cookies.set("mail", res.data.res.mail, { path: "/" });
          cookies.set("status", res.data.res.status, { path: "/" });
          cookies.set('token',res.data.res.confirmationCode,{path:'/'});
          window.location.href = "./dashboard"
          
        }

      })
      .catch((err) => {

      }
      );
      
  }
  

  return (
    <div className=" ">
      <div className="md:flex h-screen ">
        <div className="lg:w-1/3 md:w-screen ">
          <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-2">
              <div>
                <a href="/">
                  <img
                    className="mx-auto h-12 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </a>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Inicia sesión
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  O
                  <a
                    href="/signup"
                    className="font-medium m-2 text-green-600 hover:text-green-500"
                  >
                    Registrate
                  </a>
                </p>
              </div>
              <div className={isVisibleDato}>
                <h2 className="text-md text-red-500">{dato}</h2>
              </div>
              <form className="mt-8 space-y-4" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="mail"
                      type="email"
                      autoComplete="email"
                      required
                      pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                      onChange={handleChange}
                      value={form.mail || ""}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                      placeholder="Correo electrónico"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={form.password || ""}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                      placeholder="Contraseña"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      onChange={handleChecked}
                      value={form.remember}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Recuerdame
                    </label>
                  </div>

                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div> */}
                </div>
                {cargando && (
                  <div className="flex items-center justify-center">
                    <img src={loading} width={50} alt="cargando"></img>
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    onClick={handleButtonSubmit}
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
    </div>
  );
};


//function to know if domain is @gmail.com
const isUTM = (email) => {
  const domain = email.split("@")[1];
  return domain === "utm.edu.ec";
  
};




export default SigInPage;
