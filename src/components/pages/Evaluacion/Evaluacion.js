import React from "react";
import NavComponent from "../../NavComponent";

import logo from "../../../assets/resource/Logo_Provicional.png";
import recurso_evaluacion from "../../../assets/resource/recurso_evaluacion.png";
import { Link } from "react-router-dom";

const Evaluacion = () => {
  return (
    <div>
      <NavComponent logo={logo} activado={2} />

      <div className="flex flex-col my-10  space-y-3">
        <div>
          <h2 className="text-4xl font-bold ">
            Mide tu nivel actual de Ingles
          </h2>
        </div>
        <div>
          <button className="h-10 px-5 capitalize text-white font-bold transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-500">
            <Link to="/signin">Realizar prueba general</Link>
          </button>
        </div>
        <div>
          <div className="flex flex-row w-full">
            <div className="lg:w-2/4 md:w-screen m-auto">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div className="my-5 space-x-7">
                  <div className="inline-block ">
                    <h2 className="text-xl ">
                      {" "}
                      Libro {item} 
                    </h2>
                  </div>
                  <div className="inline-block">
                    <button className="h-8 mx-2 px-5 text-gray-400 transition-colors duration-150 border border-gray-300  rounded-lg focus:shadow-outline hover:bg-gray-300 hover:text-white font-bold">
                      <Link to={`/pruebas/libro/` + item}>Empezar</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-2/4 hidden md:block">
              <img
                src={recurso_evaluacion}
                alt="Recurso evaluación"
                width="400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluacion;
