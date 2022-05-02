import React from "react";
import { useState, useEffect} from "react";
import "./Ejercicio.css";
import shortid from "shortid";
import ViewImage from '../../ViewImage/ViewImage'
import axios from 'axios'

const CompletarTexto = (props) => {
  const [title, setTitle] = useState('')

  useEffect(async () => {
    
    translateText()

    }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length===0 ){
      tit=('complete the word as appropriate').replace(/[$.]/g,'')
    }else{
      tit=(props.ejercicio.question).replace(/[$.]/g,'')
    }
            
    let data = {
        q : tit.replace(/[$_]/g,'.').toLocaleLowerCase(),
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
    <div className="flex  flex-col  flex-wrap md:mt-8  xl:px-60  px-5 sm:px-20  ">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length===0?
            ('complete the word as appropriate').toUpperCase()
          :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        <div className="tooltip">
              <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>                
              <span className='tooltiptext  p-2 text-xs'>{title.toLowerCase()} </span>
        </div>
      </div>
      {props.ejercicio.img && (
      
        <ViewImage img={props.ejercicio.img} />
      )}
      <div className="container sm:m-auto  p-auto w-auto w-full  " >
        <div
          className="flex  gap-1 flex-col  justify-center my-5 sm:my-1 mr-8 ml-8   "
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
