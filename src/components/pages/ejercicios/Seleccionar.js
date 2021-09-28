
import React, { createRef, useRef } from "react";
import { useHistory } from "react-router-dom";


import "../../pages/ejercicios/CheckExercise.css"


const Seleccionar = () => {

  const opt1 = useRef(null);
  const opt2 = useRef(null);

  return (
    <div>
      
    </div>
  )
}

export default Seleccionar



export const OpcionCorrecta_1 = (props) => {

  const opciones = useRef(null);

  const imagesRef = useRef(
    [...Array(props.ejercicio.options.length)].map(() => createRef())
  );

  const marcar = (imagenRef) => {
    try {
      //borrar todas las otras referencias
      imagesRef.current.forEach((ref) => {
        ref.current.classList.contains("activado") &&
          ref.current.classList.remove("activado");
        imagenRef.current.setAttribute("aria-checked", "false");
      });

      imagenRef.current.classList.toggle("activado");
      imagenRef.current.setAttribute("aria-checked", "true");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-wrap">
    <div className="container m-auto p-auto w-auto">
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="choice"
        role="radiogroup"
      >
       {/* opt 1 */}
      <div
        style={{ height: "70px" }}
        className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
        aria-checked="false"
        role="radio"
        tabIndex="-1"
        ref={props.myref}
      >
        <button className="h-full"
          onClick={() => {
            props.marcar(props.myref);
          }}
        >
          <h2 className="text-xs sm:text-base font-medium	">{props.data.item}</h2>
        </button>
      </div>

      {/* opt2 */}
      <div
        style={{ height: "70px" }}
        className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
        aria-checked="false"
        role="radio"
        tabIndex="-1"
        ref={props.myref}
      >
        <button className="h-full"
          onClick={() => {
            props.marcar(props.myref);
          }}
        >
          <h2 className="text-xs sm:text-base font-medium	">{props.data.item}</h2>
        </button>
      </div>
      

      </div>
    </div>
    </div>
  );
};