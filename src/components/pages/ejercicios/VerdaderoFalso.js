import React, { useState, useEffect } from "react";
import shortid from "shortid";
import ViewImage from '../../../components/ViewImage/ViewImage'
import ViewAudio from '../../../components/ViewAudio/ViewAudio'
import axios from 'axios'
import "./Ejercicio.css";
import DOMPurify from 'dompurify';
import Description from "../../Description/Description";

const VerdaderoFalso = (props) => {
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
      tit = ('true or false').replace(/[$.]/g, '')
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
    <div className="flex  flex-col flex-wrap ">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm text-center font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length === 0 ?
            ('TRUE OR FALSE').toUpperCase()
            :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        {props.ejercicio.audio &&

          <ViewAudio audio={props.ejercicio.audio} />
        }

      </div>
      <div className={props.ejercicio.img || props.ejercicio.description ? "grid grid-cols-2 gap-4 min-h-80 " : "grid grid-cols-1 min-h-80"}>
        {props.ejercicio.img &&
          <ViewImage img={props.ejercicio.img} />
        }
        {props.ejercicio.description &&
          <Description description={props.ejercicio.description} />
        }
        <div className="container   w-auto ">
          <div
            className="  flex flex-col gap-4 space-y-4 md:mr-8 md:ml-8 justify-center items-center"
            aria-label="choice"
            role="radiogroup"
            ref={props.miref}
          >

            { // eslint-disable-next-line array-callback-return
              props.ejercicio.body.map((item, index) => {
                if (item.item && item.answer) {
                  let juego = [];
                  // eslint-disable-next-line array-callback-return
                  item.item.map((texto, index) => {
                    if (texto[0] === '_') {
                      // aqui van las opciones del juego true/false
                      if (item.answer) {
                        item.answer.forEach((opcion) => {
                          juego.push(<TextoMarcar key={shortid.generate()} texto={opcion[0]} />)
                        })
                      }

                    } else {
                      juego.push(texto)
                    }

                  })
                  return <TextoGeneral key={shortid.generate()} juego={juego} index={index} />
                } else {

                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}




const TextoGeneral = (props) => {
  return (
    <div className=" p-4  card flex flex-col items-stretch shadow-md rounded-md bg-white gap-2 ">

      <div className=" flex flex-wrap items-center justify-center mx-auto  my-2 space-x-2">
        {
          props.juego.map((juego, index) => {
            return (
              <span key={index} className="inline-block">
                {juego}
              </span>
            )
          })}
      </div>
    </div>
  );
};

const TextoMarcar = (props) => {

  const quitarActivados = (event) => {
    let div = Array.from(event.target.parentNode.children);

    for (let index = 0; index < div.length; index++) {
      // eslint-disable-next-line no-unused-vars
      const element = div[index].getElementsByTagName("button");
      //console.log(div[index]);
      if (div[index].classList.contains("activado")) {
        div[index].classList.remove("activado");
      }

    }
    event.target.classList.toggle("activado")

    // event.target.getElementsByTagName("p")[0].toggle("activado");

  }

  return (
    <button className={"shadow appearance-none border rounded w-auto  h-10 sm:h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"} onClick={quitarActivados}>
      {props.texto}
    </button>
  );
}


export default VerdaderoFalso
