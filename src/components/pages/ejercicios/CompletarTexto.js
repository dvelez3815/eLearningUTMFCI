import React from "react";
import { useState, useEffect } from "react";
import "./Ejercicio.css";
import shortid from "shortid";
import ViewImage from '../../../components/ViewImage/ViewImage'
import axios from 'axios'
import ViewAudio from "../../../components/ViewAudio/ViewAudio";
import DOMPurify from 'dompurify';
import Description from "../../Description/Description";

const CompletarTexto = (props) => {
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
      tit = ('complete the word as appropriate').replace(/[$.]/g, '')
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
  return (
    <div className="flex flex-col flex-wrap">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm text-center font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length === 0 ?
            ('complete the word as appropriate').toUpperCase()
            :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        {props.ejercicio.audio &&
          <ViewAudio audio={props.ejercicio.audio} />
        }

      </div>

      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 gap-4" : "grid grid-cols-1"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <Description description={props.ejercicio.description} />
        }
        <div className="container w-auto mx-auto" >
          <div
            className="flex  gap-2 flex-wrap  justify-center  md:mr-8 md:ml-8 items-center"
            ref={props.miref}
          >
            {
              // eslint-disable-next-line array-callback-return
              props.ejercicio.body.map((item, index) => {
                if (item.item && item.answer) {
                  let juego = [];
                  // eslint-disable-next-line array-callback-return
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
                }
              })}
          </div>
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
        "shadow overflow-x-auto sm:text-sm appearance-none border text-center rounded w-full py-2 md:py-3 md:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className={"w-full mx-2 text-justify uppercase	text-xs sm:text-xl"}
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
