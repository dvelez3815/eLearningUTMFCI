import React from "react";
import loading from "../../assets/resource/authentication.svg";
const SessionExpired = (props) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div style={{ fontFamily: "Montserrat" }} className="space-y-2  p-6 mx-4" >
        <img src={loading} width={250} alt="cargando"></img>
        <h1 className="text-2xl text-gray-700 font-semibold text-center">
          Oh no! Su sesión a expirado.
        </h1>
        <div className="text-center">
        <a
          type="button"
          href="/signin"
          className="mb-2  text-center px-6 py-2.5 bg-green-500 text-white font-bold text-xs leading-normal uppercase rounded shadow-md hover:bg-green-500  focus:bg-green-600  focus:outline-none focus:ring-0 active:bg-green-800  transition duration-150 ease-in-out"
        >
          Iniciar sesión
        </a>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
