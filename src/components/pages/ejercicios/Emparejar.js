
import React, { createRef, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { mostrarAlertaError, mostrarAlertaExito } from "../../Alert/Alerts";
import CancelIcon from "@material-ui/icons/Cancel";

export const Emparejar = () => {
  const history = useHistory();

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
    [...Array(datos.ejercicios.length)].map(() => createRef())
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
      <div className="flex justify-between">
        <div></div>
        <div className="order-last my-3 ">
          <button
            onClick={() => history.push("/dashboard")}
            className="bg-transparent tracking-wider  my-2 text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-yellow-500 rounded"
          >
            <CancelIcon style={{ fontSize: 27 }} /> Salir
          </button>
        </div>
      </div>

      <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-amber-200 h-4 border">
        <div
          style={{ width: `${datos.total_completado}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        ></div>
      </div>
      <div className="flex justify-between py-2">
        <h2>
          <span>
            <p className="text-2xl font-bold	text-gray-700">
              ¿Cuál oración es la correcta?
            </p>
          </span>
        </h2>
        <div className="order-last text-xl">
          <p>COMPLETADO: {`${datos.total_completado}%`}</p>
        </div>
      </div>
      <div
        className="flex flex-wrap items-center justify-center  	gap-2 my-20"
        aria-label="choice"
        role="radiogroup"
      >
        {datos.ejercicios.map((ejercicio, index) => {
          return (
            <GrammarImage
              key={index}
              src={
                "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
              }
              alt={"agua"}
              nombre={"agua"}
              marcar={marcar}
              myref={imagesRef.current[index]}
              data={datos.ejercicios[index]}
            />
          );
        })}
      </div>

      <div className="shadow-md border border-gray-300 my-5 w-full"></div>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mb-4">
          <button
            disabled={false}
            onClick={() => console.log("hola")}
            className="bg-transparent text-xl tracking-wider  my-2 text-gray-500 font-semibold hover:text-gray-400 py-2 px-4 border border-gray-500 hover:border-gray-500 rounded"
          >
            Saltar
          </button>
        </div>
        <div className="mb-4">
          <button
            className=" text-xl tracking-wider  my-2 text-white bg-green-500 font-semibold  hover:bg-green-400 py-2 px-4 capitalize border border-green-500 hover:border-green-600 rounded "
            onClick={() => mostrarAlertaError()}
          >
            <span>
              <p>comprobar</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
const GrammarImage = (props) => {
  console.log(props);
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
        <p className="text-lg	 font-medium	">{props.data.item[0]}</p>
      </button>
    </div>
  );
};
