import React from "react";

import home from "../../../assets/resource/sign.svg";
import LogoUTM from "../../../assets/resource/LOGO_UTM_ILM.png";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";

class HomePage extends React.Component {
  render() {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <NavBar />
        <div className="flex flex-1">
          <div className="lg:w-1/2 w-full overflow-auto">
            <div className=" flex items-center justify-center  px-4 sm:px-6 lg:px-8 h-full">
              <div className="max-w-md w-full space-y-2">
                <div className="space-y-5">
                  <img src={LogoUTM} alt="LOGO_UTM" className="lg:w-80 w-72" />
                  <h2 className="mt-6 text-left text-3xl font-extrabold uppercasetext-gray-900">
                    SIMULADOR DEL INSTITUTO DE LENGUAS
                  </h2>
                  <p className="text-left font-light text-gray-700 text-xl">Aprende Inglés y mide tus logros con nosotros</p>
                  <div className="flex justify-start gap-2">
                    <Link
                      to="/signin">
                      <button
                        className="px-6 py-5 lg:w-40 lg:py-2.5 lg:h-10 bg-greenutm text-white font-bold text-xs leading-normal uppercase rounded shadow-md hover:bg-greenutmbajo hover:shadow-md focus:bg-greenutmbajo  focus:outline-none focus:ring-0 active:bg-green-800  transition duration-150 ease-in-out"
                        >
                        Inicia Sesión
                      </button>
                    </Link>

                    <Link
                      to="/preguntas"
                      className="px-2  py-5  lg:py-2.5 lg:h-10 text-yellow-500 font-bold text-sm leading-normal uppercase rounded  hover:bg-gray-100  focus:bg-gray-200  focus:outline-none focus:ring-0 active:bg-yellow-800  transition duration-150 ease-in-out"
                    >Preguntas Frecuentes</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-1/2 hidden lg:block overflow-auto">
            <div className="flex-col flex items-center justify-center px-4 sm:px-6 lg:px-8 h-full">
              <div>
                <img src={home} alt="Imagen de inicio" className="lg:h-72 md:h-60 sm:h-52 h-40" />
              </div>
              <div>
                <h3 className="text-lg p-2 font-semibold italic">
                  Un idioma diferente es una visión diferente de la vida
                  <br />
                  <span className="text-gray-500 font-normal italic">
                    Federico Fellini
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;