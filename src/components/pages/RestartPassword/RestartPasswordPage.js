import React, {useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar";
import img1 from "../../../assets/resource/notFound.svg";
import logo from "../../../assets/resource/Logo_Provicional.png";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import loading from "../../../assets/resource/loading.svg";
import axios from "axios";
const cookies = new Cookies();

const isNotUTM = (email) => {
  const domain = email.split("@")[1];
  return domain !== "utm.edu.ec";
  
};
const RestartPasswordPage = () => {
  
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [cargando, setCargando] = useState(false);
  const [form, setForm] = useState({});

  const handleInputChange= (e)=> {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(async()=>{
    if (cookies.get("_id")) {
      window.location.href = "./dashboard";
    }
  }) 

  const handleButtonSubmit = async (event) => {
    event.preventDefault();
    setCargando(true);
    if(isNotUTM(form.mail)){

      axios.get(process.env.REACT_APP_API_URL + "/restartPassword/"+form.mail).then(res=>{
        console.log(res)
      })
    }else{
      viewTextMessage(false, "Solo para cuentas no institucionales")
    }

  }
  
  const viewTextMessage = (visible, text) => {
    setDato(text);
    if (visible) {
      setIsVisibleDato("visible");
    } else {
      setIsVisibleDato("");
    }
    setCargando(false);
    setInterval(() => {
      setDato("");
      setIsVisibleDato("hidden");
    }, 10000);
  };

    return (
      <div>
        <NavBar ocultar="invisible"></NavBar>
        <div className="container mx-auto w-screen ">
          <div className="min-h-full flex-col flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src={logo}
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Reestablece tu contraseña
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  O
                  <a
                    href="/signup"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Registrate
                  </a>
                </p>
              </div>
              <div className={isVisibleDato}>
                <h2 className="text-md text-red-500">{dato}</h2>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="mail"
                    type="email"
                    pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                    autoComplete="email"
                    required
                    onChange={handleInputChange}
                    className=" border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500  focus:z-10 sm:text-sm appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none "
                    placeholder="Correo electrónico"
                  />
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

export default RestartPasswordPage;
