import React, { createRef, useRef, useState, useEffect } from "react";
import ViewImage from '../../../components/ViewImage/ViewImage'
import axios from 'axios';
import ViewAudio from "../../../components/ViewAudio/ViewAudio";

export const OpcionCorrecta_n = (props) => {

  // eslint-disable-next-line no-unused-vars
  const opciones = useRef(null);
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
      tit = ('Select the correct answer').replace(/[$.]/g, '')
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

  const imagesRef = useRef(
    [...Array(props.ejercicio.options.length)].map(() => createRef())
  );



  const marcar = (imagenRef) => {
    try {
      //borrar todas las otras referencias
      imagenRef.current.classList.toggle("activado");
      imagenRef.current.setAttribute("aria-checked", "true");
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex  flex-col flex-wrap">
      <div className="static  px-4 min-w-fit ">
        <h2 className="m-auto p-3 text-sm text-center font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length === 0 ?
            ('Select the correct answer').toUpperCase()
            :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        {props.ejercicio.audio &&
          <ViewAudio audio={props.ejercicio.audio} />
        }

      </div>
      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 gap-4 min-h-80" : "grid grid-cols-1 min-h-80"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <div className="flex items-center justify-center">

            <div className="w-full h-64 overflow-y-scroll p-4 border text-left rounded border-gray-300">
              <pre>{props.ejercicio.description}</pre>
            </div>
          </div>
        }
        <div className="container  w-auto ">
          <div
            className="flex flex-wrap gap-2 md:mr-8 md:ml-8 justify-center items-center"
            aria-label="choice"
            role="radiogroup"

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
    </div>
  );
};

const Texto = (props) => {
  return (
    <div
      style={{ height: "70px" }}
      className="flex flex-col   overflow-y-auto w-2/5 center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
      ref={props.myref}
    >
      <button
        className="h-full text-xs px-4 md:px-8  sm:text-xs "
        onClick={() => {
          props.marcar(props.myref);
        }}
      >
        {props.data.item}
      </button>
    </div>
  );
};


export default OpcionCorrecta_n;