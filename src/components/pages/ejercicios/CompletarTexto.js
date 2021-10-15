import React from "react";
import ProgressBar from "./ProgressBar";
import "./Ejercicio.css";
import shortid from "shortid";
import ViewImage from '../../ViewImage/ViewImage'
const CompletarTexto = (props) => {
  return (
    <div className="flex flex-col  flex-wrap mt-8 sm:px-60 my-10">
      <h2 className="m-auto p-auto text-sm font-bold sm:text-2xl text-green-700 p-5">
        {props.ejercicio.question}
      </h2>
      {props.ejercicio.img && (
      
        <ViewImage img={props.ejercicio.img} />
      )}
      <div className="container m-auto p-auto w-auto my-2 ">
        <div
          className="flex flex-col items-center justify-center gap-2 text-xs   mr-8 ml-8"
          ref={props.miref}
        >
          {props.ejercicio.body.map((item, index) => {
            if (item.item && item.answer) {
              let juego = [];
              item.item.map((texto, index) => {
                if (texto[0] === "_") {
                  // aqui van las opciones
                  juego.push(
                    <InputCompletarTexto texto={""} key={shortid.generate()} />
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
      </div>
    </div>
  );
};

const InputCompletarTexto = (props) => {
  const [texto, setTexto] = React.useState("");

  return (
    <input
      className={
        "shadow  appearance-none border text-center rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      }
      type="text"
      value={texto}
      onChange={(e) => {
        setTexto(e.target.value);
      }}
    />
  );
};

const JuegoCompletarTexto = (props) => {
  return (
    <div className="flex w-full  justify-items-center py-1	items-center">
      {props.juego.map((juego, index) => {
        if (typeof juego === "string") {
          return (
            <p
              key={shortid.generate()}
              className={"w-full mx-2 text-justify	text-xs sm:text-xl"}
            >
              {juego}
            </p>
          );
        } else {
          return juego;
        }
      })}
    </div>
  );
};

export default CompletarTexto;
