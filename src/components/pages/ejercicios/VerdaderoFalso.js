import React, { useState,useEffect } from "react";
import shortid from "shortid";
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
