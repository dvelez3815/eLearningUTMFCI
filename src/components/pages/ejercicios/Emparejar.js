import React, { useEffect, useState } from "react";
import shortid from "shortid";
import "../../pages/ejercicios/CheckExercise.css";
import ViewImage from '../../ViewImage/ViewImage'
const Emparejar = (props) => {
  const [opciones, setOpciones] = useState([]);
  const divRef = React.useRef(null);
  const opcionesRef = React.useRef(null);

  let opcionesElegidas = [];

  const quitarRepetidos = (opciones) => {
    let seen = new Set();
    return opciones.filter((item) => {
      let k = item;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  useEffect(() => {
    if (props.ejercicio.body) {
      props.ejercicio.body.forEach((opcion) => {
        opcionesElegidas.push(opcion.answer);
      });
    }
    if (props.ejercicio.options) {
      props.ejercicio.options.forEach((opcion) => {
        opcionesElegidas.push(opcion);
      });
    }
    opcionesElegidas = quitarRepetidos(opcionesElegidas);
    opcionesElegidas.sort((a, b) => {
      if (a.length < b.length) return -1;
      else return 1;
    });
    setOpciones(opcionesElegidas);
  }, []);

  const cambiarVisibilidad = (event, props) => {
    let aMarcar = Array.from(divRef.current.firstChild.children);

    let contador = 0;
    aMarcar.forEach((element) => {
      console.log(element.getElementsByTagName("button")[0].innerText);
      if (
        element.getElementsByTagName("button")[0].innerText ===
        "click en las opciones"
      ) {
        contador += 1;
      }
    });

    //Si ya se han completado todas las opciones
    console.log(contador, aMarcar.length);
    if (contador !== 0) {
      aMarcar.some((element) => {
        if (
          element.getElementsByTagName("button")[0].innerText ===
          "click en las opciones"
        ) {
          element.getElementsByTagName("button")[0].innerText =
            event.target.innerText;
          event.target.parentNode.parentNode.classList.add("bg-gray-400");
          event.target.parentNode.classList.add("invisible");
          return true;
        }
      });
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col flex-wrap my-5">
      <h2 className="m-auto p-auto text-sm font-bold sm:text-2xl">
        {props.ejercicio.question}
      </h2>
      {props.ejercicio.img && (
           <ViewImage img={props.ejercicio.img} />
        )}
      <div className="container m-auto p-auto w-auto" ref={divRef}>
        <div
          className="flex flex-col items-center justify-center gap-2 mr-8 ml-8"
          ref={props.miref}
        >
          {props.ejercicio.body.map((item, index) => {
            if (item.item && item.answer) {
              let juego = [];
              item.item.map((texto, index) => {
                if (texto[0] === "_") {
                  // aqui van las opciones
                  juego.push(
                    <InputCompletarTexto
                      texto={""}
                      key={shortid.generate()}
                      opcionesRef={opcionesRef}
                      opt={Array.from(opciones)}
                    />
                  );
                } else {
                  juego.push(texto);
                }
              });
              return (
                <JuegoCompletarTexto key={shortid.generate()} juego={juego} />
              );
            } else {
            }
          })}
        </div>
        <div className="flex flex-wrap gap-2 my-4" ref={opcionesRef}>
          {opciones.length > 0 &&
            opciones.map((opcion, index) => {
              return (
                <div key={shortid.generate()} className={"rounded-full"}>
                  <button
                    onClick={(event, props) => {
                      cambiarVisibilidad(event, props);
                    }}
                  >
                    <span className="text-sm sm:text-lg p-2 cardCheck">
                      {opcion}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const InputCompletarTexto = (props) => {
  const volverALaNormalidad = (event) => {
    let opciones = Array.from(props.opcionesRef.current.children);
    opciones.forEach((element, index) => {
      if (props.opt[index] === event.target.innerText) {
        element.firstChild.classList.remove("invisible");
        element.classList.remove("bg-gray-400");
        event.target.innerText = "click en las opciones";
      }
    });
  };

  return (
    <button
      className={
        "shadow appearance-none border rounded w-full h-13 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
      }
      onClick={volverALaNormalidad}
    >
      click en las opciones
    </button>
  );
};

const JuegoCompletarTexto = (props) => {
  return (
    <div className="grid grid-cols-2 w-full sm:w-full  items-center gap-4 space-y-2">
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego === "string") {
            return (
              <h2
                key={shortid.generate()}
                className={
                  "w-auto sm:w-auto mx-2 text-right text-xs sm:text-xl"
                }
              >
                {juego}
              </h2>
            );
          }
        })}
      </div>
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego !== "string") {
            return juego;
          }
        })}
      </div>
    </div>
  );
};

export default Emparejar;
