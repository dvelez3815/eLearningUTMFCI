
import React, { createRef, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { mostrarAlertaError, mostrarAlertaExito } from "../../Alert/Alerts";
import CancelIcon from "@material-ui/icons/Cancel";

export const Emparejar = (props) => {
  const history = useHistory();
  const opciones = useRef(null);


  let datos = {
    total_completado: 80,
    ejercicios: [
      {
        id: 1,
        item: ["Please hold the line", "____________"],
        respuesta: "library",
      },
      {
        id: 2,
        item: ["Please you hold the line", "____________"],
        respuesta: "pizza",
      },
      {
        id: 3,
        item: ["Please to hold the line", "____________"],
        respuesta: "bank",
      },
      {
        id: 4,
        item: ["Please hold your the line", "____________"],
        respuesta: "library",
      },
    ],
  };

  const imagesRef = useRef(
    [...Array(props.ejercicio.options.length)].map(() => createRef())
  );

  const [marcado, setMarcado] = useState(false);
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
    <div className="container m-auto p-auto   w-10/12">

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
  );
};
const Texto = (props) => {

  return (
    <div
      style={{ height: "70px" }}
      className="flex flex-col w-1/4 center-items justify-center flex-wrap cardCheck"
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
        <p className="text-lg	 font-medium	">{props.data.item}</p>
      </button>
    </div>
  );
};
