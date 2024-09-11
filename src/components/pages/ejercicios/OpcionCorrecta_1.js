import React, { createRef, useRef, useState, useEffect } from "react";
import "../../pages/ejercicios/CheckExercise.css";
import ViewImage from '../../ViewImage/ViewImage'
import axios from 'axios';

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
    <div className="flex  flex-col flex-wrap md:mt-8 xl:px-60  sm:px-20 ">
      <div className=" static  px-4 min-w-fit ">
        <h2 className="  justify-center items-center m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">

          {String(props.ejercicio.question).length === 0 ?
            ('Select the correct answer').toUpperCase()
            :
            (props.ejercicio.question).toUpperCase()
          }{" "}

        </h2>

      </div>
      <div>
      </div>
      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 gap-4 items-center justify-center" : "grid grid-cols-1 items-center justify-center"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <div className="w-full h-64 overflow-y-scroll p-4 border border-gray-300">
            <p>{props.ejercicio.description}</p>
          </div>
        }
        <div className="container sm:m-auto  p-auto w-auto">
          <div
            className="  flex flex-wrap pt-10 items-center justify-center gap-2  sm:items-center w-96 sm:justify-center pb-5  mr-8 ml-8 "
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
