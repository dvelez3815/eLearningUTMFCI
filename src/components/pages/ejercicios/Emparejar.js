import React, { useEffect, useState } from "react";
import shortid from "shortid";
import "../../pages/ejercicios/CheckExercise.css";
import ViewImage from "../../ViewImage/ViewImage";
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
    console.log(aMarcar);

    let contador = 0;
    aMarcar.forEach((element) => {
      
      if (
        element.getElementsByClassName('opt-1')[0].innerText ===
        "Waiting answer..."
      ) {
        contador += 1;
      }
    });

    //Si ya se han completado todas las opciones
    
    if (contador !== 0) {
      aMarcar.some((element) => {
        if (
          element.getElementsByClassName('opt-1')[0].innerText ===
          "Waiting answer..."
        ) {
          element.getElementsByClassName('opt-1')[0].innerText =
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
    <div className="flex flex-col flex-wrap mt-8 xl:px-80 sm:px-20  ">
      <h2 className="m-auto p-3 text-sm  font-bold sm:text-2xl text-green-700 ">
        {props.ejercicio.question}{" "}
      </h2>
      {props.ejercicio.img && <ViewImage img={props.ejercicio.img} />}
      <div className="contenedor m-auto p-auto w-auto my-1 " ref={divRef}>
        <div
          className="flex flex-col items-center justify-center my-5 sm:my-1 mr-8 ml-8   "
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
                <JuegoCompletarTexto
                  key={shortid.generate()}
                  type={props.ejercicio.type}
                  juego={juego}
                />
              );
            } else {
            }
          })}
        </div>
        <div
          className="flex flex-wrap gap-2 py-10 justify-center"
          ref={opcionesRef}
        >
          {opciones.length > 0 &&
            opciones.map((opcion, index) => {
              return (
                <div key={shortid.generate()} className={"rounded-full "}>
                  <button
                    onClick={(event, props) => {
                      cambiarVisibilidad(event, props);
                    }}
                  >
                    <span className="text-sm sm:text-lg cardCheck px-5 border-yellow-200 ">
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
        event.target.innerText = "Waiting answer...";
      }
    });
  };

  return (
    <button
      className={
        "shadow appearance-none border rounded w-full h-13 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs opt-1"
      }
      onClick={volverALaNormalidad}
    >
      Waiting answer...
    </button>
  );
};

const JuegoCompletarTexto = (props) => {
  return (
    <div className="grid grid-cols-2 text-justify items-center  my-2 ">
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego === "string") {
              
            return (
              <div
                key={shortid.generate()}
              >
                  {/* <ViewImage img={juego}/> */}
                {props.type === "emparejar_img" && <ViewImage img={juego} />}
                {props.type == "emparejar" && <h2 className=
                  "mx-2 text-justify text-xs sm:text-lg"
                 >{ juego }</h2>}
              </div>
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
