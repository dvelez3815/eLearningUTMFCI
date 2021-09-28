import React, { createRef, useRef, useState } from "react";
import shortid from "shortid";
import { OpcionCorrecta_1 } from "./OpcionCorrecta_1";
import Seleccionar from "./Seleccionar";

const VerdaderoFalso = () => {

    let data = {
        "options": [],
        "body": [
            {
                "Item": [
                    "The book belongs to me. It is",
                    "___________",
                    "book."
                ],
                "answer": [
                    [
                        "my",
                        true
                    ],
                    [
                        "our",
                        false
                    ]
                ]
            },
            {
                "item": [
                    "The bike belongs to him. It is",
                    "___________",
                    "bike."
                ],
                "respuesta": [
                    [
                        "him",
                        false
                    ],
                    [
                        "his",
                        true
                    ]
                ]
            },
            {
                "item": [
                    "The computer belongs to her. It is",
                    "___________",
                    "computer"
                ],
                "answer": [
                    [
                        "her",
                        true
                    ],
                    [
                        "his",
                        false
                    ]
                ]
            },
            {
                "item": [
                    "The phone belongs to you. It is",
                    "___________",
                    "phone."
                ],
                "answer": [
                    [
                        "your",
                        true
                    ],
                    [
                        "his",
                        false
                    ]
                ]
            },
            {
                "item": [
                    "The house belongs to us. It is",
                    "___________",
                    "house."
                ],
                "answer": [
                    [
                        "our",
                        true
                    ],
                    [
                        "her",
                        false
                    ]
                ]
            }
        ],
        "_id": "6133b40062a77824887c0fe1",
        "task_id": "6133ad8d62a77824887c0fc9",
        "type": "true_false",
        "question": "Select the correct possessive adjective.",
        "__v": 0
    }
    
    return (
        <div className="flex flex-col flex-wrap mt-8">
          <h2 className="m-auto p-auto text-2xl">{(data.question)}</h2>
        <div className="container m-auto p-auto w-auto">
          <div
            className="flex flex-col items-center justify-center  	gap-2 my-20">
            {data.body.map((item, index) => {
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
        let div = event.target.parentNode.parentNode.children;
        
        for (let index = 0; index < div.length; index++) {
            const element = div[index];
            if(element.classList.contains("cardCheck")){
                element.children[0].classList.remove("activado");
            }
        }
        
        event.target.classList.toggle("activado");
        
    }

    return (
        <div
          className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
          aria-checked="false"
          role="radio"
          tabIndex="-1"
          
        >
         <button onClick={quitarActivados}>{props.texto}</button>
        </div>
      );      
  }
  

export default VerdaderoFalso
