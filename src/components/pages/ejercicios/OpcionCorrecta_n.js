
import React, { createRef, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export const OpcionCorrecta_n = (props) => {
  const history = useHistory();
  const opciones = useRef(null);

  const imagesRef = useRef(
    [...Array(props.ejercicio.options.length)].map(() => createRef())
  );


  const marcar = (imagenRef) => {
    try {
      //borrar todas las otras referencias
      imagenRef.current.classList.toggle("activado");
      imagenRef.current.setAttribute("aria-checked", "true");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-wrap mt-8">
      <h2 className="m-auto p-auto text-2xl">{(props.ejercicio.question)}</h2>
    <div className="container m-auto p-auto w-auto">
      <div
        className="flex flex-wrap items-center justify-center  	gap-2 my-20"
        aria-label="choice"
        role="radiogroup"
        ref={opciones}
        ref={props.miref}
      >
        {props.ejercicio.options.map((ejercicio, index) => {
          return (
            <Texto
              key={index}
              src={
                "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
              }
              alt={"agua"}
              nombre={"agua"}
              marcar={marcar}
              myref={imagesRef.current[index]}
              data={props.ejercicio.options[index]}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
};
const Texto = (props) => {

  return (
    <div
      style={{ height: "70px" }}
      className="flex flex-col w-2/5 center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
      ref={props.myref}
    >
      <button
        onClick={() => {
          props.marcar(props.myref);
        }}
      >
        <p className="text-xs sm:text-base font-medium	">{props.data.item}</p>
      </button>
    </div>
  );
};
