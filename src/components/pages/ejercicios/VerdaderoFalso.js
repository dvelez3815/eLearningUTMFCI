import React, { createRef, useRef, useState } from "react";
import shortid from "shortid";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";

const VerdaderoFalso = (props) => {
    return (
      <div className="flex flex-col flex-wrap mt-8">  
      <h2 className="m-auto p-auto text-sm font-bold sm:text-2xl">{(props.ejercicio.question)}</h2>
    <div className="container m-auto p-auto w-auto">
      <div className="flex flex-col items-center justify-center gap-2 my-20 mr-8 ml-8" ref={props.miref}>
            {props.ejercicio.body.map((item, index) => {
                if(item.item  && item.answer){
                    let juego = [];
                    item.item.map((texto, index) => {
                      console.log(texto)
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
                    return <TextoGeneral key={shortid.generate()} juego={juego}/>
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
      <div className="text-left w-full">
        <h2 className="text-md font-bold text-left my-4 uppercase block">---------------</h2>

      <div className="flex gap-3 flex-wrap">
          {props.juego.map((juego,index)=>{
            if(typeof juego === 'string'){
              return <p key={shortid.generate()} className={"w-auto sm:w-auto mx-2 text-justify	text-xs sm:text-xl"}>{juego}</p>
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
          console.log(div[index]);
          if(div[index].classList.contains("activado")){
            div[index].classList.remove("activado");
          }

        }
        event.target.classList.toggle("activado")
        
        // event.target.getElementsByTagName("p")[0].toggle("activado");
        
    }

    return (
      <button className={"shadow appearance-none border rounded w-auto h-10 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"} onClick={quitarActivados}>{props.texto}</button>
      );      
  }
  

export default VerdaderoFalso
