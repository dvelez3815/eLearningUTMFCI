import React, { createRef, useRef, useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import ViewImage from '../../ViewImage/ViewImage'
import axios from 'axios';

export const OpcionCorrecta_n = (props) => {
  const history = useHistory();
  const opciones = useRef(null);
  const [title, setTitle] = useState('')

  useEffect(async () => {
    
    translateText()

    }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length===0 ){
      tit=('Select the correct answer').replace(/[$.]/g,'')
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
    <div className="flex  flex-col flex-wrap md:mt-8 xl:px-60   sm:px-20 ">
      <div className="static  px-4 min-w-fit ">
        <h2 className="m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length===0?
            ('Select the correct answer').toUpperCase()
          :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>

      </div>
      <div>      
        {props.ejercicio.img && (
          <ViewImage img={props.ejercicio.img} />
        )}
      </div>
      <div className="container sm:m-auto  p-auto w-auto w-full  ">
        <div
          className="flex flex-wrap pt-10 items-center justify-center gap-2  sm:items-center sm:justify-center pb-5   md:mr-8 md:ml-8 "
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
