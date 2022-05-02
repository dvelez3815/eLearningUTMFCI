import React, { createRef, useRef, useState,useEffect } from "react";
import shortid from "shortid";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";
import ViewImage from '../../ViewImage/ViewImage'
import axios from 'axios'
const VerdaderoFalso = (props) => {
  const [title, setTitle] = useState('')
  
  useEffect(async () => {
    
    translateText()

    }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length===0 ){
      tit=('true or false').replace(/[$.]/g,'')
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
      <div className="flex  flex-col flex-wrap md:mt-8 xl:px-60  px-5 sm:px-20  ">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length===0?
            ('TRUE OR FALSE').toUpperCase()
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
          <ViewImage img={props.ejercicio.img}/>
        )}
    <div className="container sm:m-auto  p-auto w-auto w-full  ">
        <div
          className="  flex flex-wrap  items-center justify-center gap-2  sm:items-center sm:justify-center pb-5  md:mr-8 md:ml-8 "
          aria-label="choice"
          role="radiogroup"
          ref={props.miref}
        >
            
            {props.ejercicio.body.map((item, index) => {
                if(item.item  && item.answer){
                    let juego = [];
                    item.item.map((texto, index) => {
                      //console.log(texto)
                        if(texto[0]==='_'){
                            // aqui van las opciones del juego true/false
                            if(item.answer)
                            {item.answer.forEach((opcion)=>{
                                juego.push(<TextoMarcar key={shortid.generate()} texto={opcion[0]}/>)
                            })}
                            
                        }else{
                            juego.push(texto)
                        }
                        
                    })
                    return <TextoGeneral key={shortid.generate()} juego={juego} index={index}/>
                }else{
                    
                }
            })
            }
          </div>
        </div>
        </div>
      );
}




  const TextoGeneral= (props) => {
    return (
      <div className="text-center w-full p-4 ">
        <h2 className="text-md font-bold text-left my-4 uppercase block"></h2>

      <div className="  w-full">
          {props.juego.map((juego,index)=>{
            if(typeof juego === 'string'){
              return <p key={shortid.generate()} className={"w-auto py-2 sm:w-auto font-bold uppercase mx-2 text-justify text-xs	md:text-md "}>{juego}</p>
            }else if(typeof juego === 'object'){
              return juego
            }
          })}
      </div>
          </div>
    );
  };

  const TextoMarcar = (props) => {

    const quitarActivados = (event) => {
        let div = Array.from(event.target.parentNode.children);
        
        for (let index = 0; index < div.length; index++) {
          const element = div[index].getElementsByTagName("button");
          //console.log(div[index]);
          if(div[index].classList.contains("activado")){
            div[index].classList.remove("activado");
          }

        }
        event.target.classList.toggle("activado")
        
        // event.target.getElementsByTagName("p")[0].toggle("activado");
        
    }

    return (
      <button className={"shadow appearance-none border rounded w-auto  h-10 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"} onClick={quitarActivados}>
           { props.texto}
        </button>
      );      
  }
  

export default VerdaderoFalso
