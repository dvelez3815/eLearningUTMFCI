import React, { createRef, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../../pages/ejercicios/CheckExercise.css";
import ViewImage from '../../ViewImage/ViewImage'
export const OpcionCorrecta_1 = (props) => {
  const history = useHistory();
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
    <div className="flex flex-col space-y-10 xl:px-80 sm:px-20 ">
      <h2 className="mt-10 text-sm mr-8 ml-8 md:text-2xl font-bold text-green-700 py-5">
        {props.ejercicio.question}
      </h2>

      {props.ejercicio.img && (
          <ViewImage img={props.ejercicio.img} />
        )}
     {/*  {!props.ejercicio.img && <div className="h-20"></div>} */}
      <div className="container w-auto ">
        <div
          className="flex flex-wrap items-center justify-center gap-2"
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
                ejercicio={props.ejercicio}
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
      className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
      ref={props.myref}
    >
      <button
        className="h-full"
        onClick={() => {
          props.marcar(props.myref);
        }}
      >
        <h2 className="text-xs sm:text-xs ">{props.data.item}</h2>
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
