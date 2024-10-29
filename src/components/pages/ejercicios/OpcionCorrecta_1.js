import React, { createRef, useRef, useState, useEffect } from "react";
import "./CheckExercise.css";
import ViewImage from '../../../components/ViewImage/ViewImage'
import axios from 'axios';
import ViewAudio from "../../../components/ViewAudio/ViewAudio";
import "./Ejercicio.css";
import DOMPurify from 'dompurify';

export const OpcionCorrecta_1 = (props) => {

  // eslint-disable-next-line no-unused-vars
  const opciones = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    translateText()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imagesRef = useRef(
    [...Array(props.ejercicio.options.length)].map(() => createRef())
  );

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

  const marcar = (imagenRef) => {
    try {
      //borrar todas las otras referencias
      imagesRef.current.forEach((ref) => {
        ref.current.classList.contains("activado") &&
          ref.current.classList.remove("activado");
        imagenRef.current.setAttribute("aria-checked", "false");
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }
      });

      imagenRef.current.classList.toggle("activado");
      imagenRef.current.setAttribute("aria-checked", "true");
      setTimeout(() => {
        SpeechReader(imagenRef.current.children[0].innerText);
      }, 50);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex  flex-col flex-wrap  ">
      <div className=" static  px-4 min-w-fit ">
        <h2 className="  text-center m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">

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
      <div>
      </div>
      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 h-80 gap-4 items-center justify-center" : "grid grid-cols-1 items-center h-80 justify-center"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <div className="flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.ejercicio.description) }} className="w-full h-64 overflow-y-scroll p-4 text-left rounded border border-gray-300">
            </div>
          </div>
        }
        <div className="container w-auto">
          <div
            className="flex  md:flex-wrap flex-col md:flex-row gap-2 mr-8 ml-8  justify-center items-center"
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
                  ejercicio={props.ejercicio}
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
      style={{ height: "80px" }}
      className="flex flex-col   overflow-y-auto w-auto center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
      ref={props.myref}
    >
      <button
        className="h-full md:text-xs px-4 md:px-8  sm:text-xs "
        onClick={() => {
          props.marcar(props.myref);
        }}
      >
        {props.data.item}
      </button>
    </div>
  );
};

function SpeechReader(texto) {
  let voices = window.speechSynthesis.getVoices();
  //englich voice
  let voice = voices.filter((voice) => voice.lang === "en-US")[0];

  let utterance = new SpeechSynthesisUtterance(texto);
  utterance.voice = voice;
  utterance.pitch = 1;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default OpcionCorrecta_1;