import React, { useEffect, useState } from "react";
import shortid from "shortid";
import "./CheckExercise.css";
import ViewImage from '../../../components/ViewImage/ViewImage'
import axios from 'axios'
import ViewAudio from "../../../components/ViewAudio/ViewAudio";
import "./Ejercicio.css";
import DOMPurify from 'dompurify';
const Emparejar = (props) => {
  const [opciones, setOpciones] = useState([]);
  const divRef = React.useRef(null);
  const opcionesRef = React.useRef(null);

  let opcionesElegidas = [];
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    translateText()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length === 0) {
      tit = ('match as appropriate').replace(/[$.]/g, '')
    } else {
      tit = (props.ejercicio.question).replace(/[$.]/g, '')
    }

    let data = {
      q: tit.replace(/[$_]/g, '.').toLocaleLowerCase(),
      source: 'en',
      target: 'es'
    }
    axios.post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setTitle(response.data.translatedText)
        //console.log(response.data.translatedText)
      })
  }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    opcionesElegidas = quitarRepetidos(opcionesElegidas);
    opcionesElegidas.sort((a, b) => {
      if (a.length < b.length) return -1;
      else return 1;
    });
    setOpciones(opcionesElegidas);
  }, []);

  const cambiarVisibilidad = (event, props) => {
    let aMarcar = Array.from(divRef.current.firstChild.children);
    //console.log(aMarcar);

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
      // eslint-disable-next-line array-callback-return
      aMarcar.some((element) => {
        if (
          element.getElementsByClassName('opt-1')[0].innerText ===
          "Waiting answer..."
        ) {
          element.getElementsByClassName('opt-1')[0].innerText =
            event.target.innerText;
          element.getElementsByClassName('opt-1')[0].classList.add("bg-blue-50");
          element.getElementsByClassName('opt-1')[0].classList.add("shadow-lg");
          element.getElementsByClassName('opt-1')[0].classList.add("border-blue-200");
          event.target.parentNode.parentNode.classList.add("bg-gray-400");
          event.target.parentNode.parentNode.classList.add("text-sm");
          event.target.parentNode.classList.add("invisible");

          return true;
        }
      });
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className="flex  flex-col flex-wrap">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm text-center font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length === 0 ?
            ('match as appropriate').toUpperCase()
            :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        {props.ejercicio.audio &&
          <ViewAudio audio={props.ejercicio.audio} />
        }
      </div>
      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 gap-4  min-h-80" : "grid grid-cols-1  min-h-80"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <div className="flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.ejercicio.description) }} className="w-full h-64 overflow-y-scroll p-4 text-left rounded border border-gray-300">
            </div>
          </div>
        }
      </div>
      <div className="container w-auto mx-auto" ref={divRef}>
        <div
          className="flex gap-2 flex-wrap justify-center items-center md:mr-8 md:ml-8"
          ref={props.miref}
        >
          {
            // eslint-disable-next-line array-callback-return
            props.ejercicio.body.map((item, index) => {
              let juego = [];
              if (item.item && item.answer) {
                juego.push(item.item.join(" "))
                juego.push(<InputCompletarTexto
                  texto={""}
                  key={shortid.generate()}
                  opcionesRef={opcionesRef}
                  opt={Array.from(opciones)}
                />)
              }
              return (
                <JuegoCompletarTexto
                  key={shortid.generate()}
                  type={props.ejercicio.type}
                  juego={juego}
                />
              );
            })}
        </div>
        <div
          className="flex static min-w-fit flex-wrap gap-2 md:py-6  px-10 justify-center"
          ref={opcionesRef}
        >

          {opciones.length > 0 &&
            opciones.map((opcion, index) => {
              return (
                <div key={shortid.generate()} className={"rounded-full  "}>
                  <button
                    onClick={(event, props) => {
                      cambiarVisibilidad(event, props);
                    }}
                  >
                    <span className="md:text-sm text-xs  p-2 min-w-full cardCheck px-5 border-blue-200 bg-blue-50">
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
        event.target.classList.remove("bg-blue-50");
        event.target.classList.remove("shadow-lg");
        event.target.classList.remove("border-blue-200");
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
    <div className="grid grid-cols-2 text-justify items-center space-x-7 my-2 ">
      {
        props.juego.map((juego, index) => {
          if (typeof juego === "string") {
            return (
              <div
                key={shortid.generate()}
              >
                {props.type === "emparejar_img" && <ViewImage img={juego} />}
                {
                  props.type === "emparejar" && <h2 className=
                    "mx-2 text-right w-auto sm:text-sm text-xs"
                  >{juego}</h2>}
              </div>
            );
          }
          return juego;
        })}
    </div>
  );
};

export default Emparejar;
