import React, { createRef, useRef, useState } from "react";
import shortid from "shortid";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";

const VerdaderoFalso = (props) => {
    return (
        <div className="flex flex-col flex-wrap mt-8">  
          <h2 className="m-auto p-auto text-2xl">{(props.ejercicio.question)}</h2>
        <div className="container m-auto p-auto w-auto">
          <div
            className="flex flex-col items-center justify-center  	gap-2 my-20" ref={props.miref}>
            {props.ejercicio.body.map((item, index) => {
                if(item.item  && item.answer){
                    let juego = [];
                    item.item.map((texto, index) => {
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
      <div className="flex">
          {props.juego.map((juego,index)=>{
              if(typeof juego === 'string'){
                  return <p key={shortid.generate()} >{juego}</p>
              }else if(typeof juego === 'object'){
                    return juego
              }
          })}
      </div>
    );
  };

  const TextoMarcar = (props) => {

    const quitarActivados = (event) => {
        let div = event.target.parentNode.parentNode.parentNode.getElementsByTagName('div');
        for (let index = 0; index < div.length; index++) {
          const element = div[index].getElementsByTagName("button");
          for (let index = 0; index < element.length; index++) {
            const boton = element[index];
            boton.classList.remove("activado")
            
          }
          
        }
        
        (event.target.parentNode.classList.toggle("activado"));
        // event.target.getElementsByTagName("p")[0].toggle("activado");
        
    }

    return (
        <div
          className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
          aria-checked="false"
          role="radio"
          tabIndex="-1"
          
        >
         <button onClick={quitarActivados}><p>{props.texto}</p></button>
        </div>
      );      
  }
  

export default VerdaderoFalso
