import React, { useEffect, useState } from "react";
import shortid from "shortid";
import "../../pages/ejercicios/CheckExercise.css";
import ViewImage from "../../ViewImage/ViewImage";
import axios from 'axios'
const Emparejar = (props) => {
  const [opciones, setOpciones] = useState([]);
  const divRef = React.useRef(null);
  const opcionesRef = React.useRef(null);

  let opcionesElegidas = [];
  const [title, setTitle] = useState('')
  
  useEffect(async () => {
    
    translateText()

    }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length===0 ){
      tit=('match as appropriate').replace(/[$.]/g,'')
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
  const quitarRepetidos = (opciones) => {
    let seen = new Set();
    return opciones.filter((item) => {
      let k = item;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  useEffect(() => {
    if (props.ejercicio.body) {
      props.ejercicio.body.forEach((opcion) => {
        opcionesElegidas.push(opcion.answer);
      });
    }
    if (props.ejercicio.options) {
      props.ejercicio.options.forEach((opcion) => {
        opcionesElegidas.push(opcion);
      });
    }
    opcionesElegidas = quitarRepetidos(opcionesElegidas);
    opcionesElegidas.sort((a, b) => {
      if (a.length < b.length) return -1;
      else return 1;
    });
    setOpciones(opcionesElegidas);
  }, []);

  const cambiarVisibilidad = (event, props) => {
    let aMarcar = Array.from(divRef.current.firstChild.children);
    //console.log(aMarcar);

    let contador = 0;
    aMarcar.forEach((element) => {
      
      if (
        element.getElementsByClassName('opt-1')[0].innerText ===
        "Waiting answer..."
      ) {
        contador += 1;
      }
    });

    //Si ya se han completado todas las opciones
    
    if (contador !== 0) {
      aMarcar.some((element) => {
        if (
          element.getElementsByClassName('opt-1')[0].innerText ===
          "Waiting answer..."
        ) {
          element.getElementsByClassName('opt-1')[0].innerText =
            event.target.innerText;
            element.getElementsByClassName('opt-1')[0].classList.add("bg-blue-50");
            element.getElementsByClassName('opt-1')[0].classList.add("shadow-lg");
            element.getElementsByClassName('opt-1')[0].classList.add("border-blue-200");
            event.target.parentNode.parentNode.classList.add("bg-gray-400");
          event.target.parentNode.parentNode.classList.add("text-sm");
          event.target.parentNode.classList.add("invisible");
          
          return true;
        }
      });
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className="flex  flex-col flex-wrap md:mt-8 xl:px-60  px-5 sm:px-20  ">
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length===0?
            ('match as appropriate').toUpperCase()
          :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>
        <div className="tooltip">
              <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>                
              <span className='tooltiptext  p-2 text-xs'>{title.toLowerCase()} </span>
        </div>
      </div>
      {props.ejercicio.img && <ViewImage img={props.ejercicio.img} />}
      <div className="container sm:m-auto p-auto w-auto w-full  " ref={divRef}>
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
                    <InputCompletarTexto
                      texto={""}
                      key={shortid.generate()}
                      opcionesRef={opcionesRef}
                      opt={Array.from(opciones)}
                    />
                  );
                } else {
                  juego.push(texto);
                }
              });
              return (
                <JuegoCompletarTexto
                  key={shortid.generate()}
                  type={props.ejercicio.type}
                  juego={juego}
                />
              );
            } else {
            }
          })}
        </div>
        <div
          className="flex  px-6 static min-w-fit flex-wrap gap-2 md:py-6  px-10 justify-center"
          ref={opcionesRef}
        >
          
          {opciones.length > 0 &&
            opciones.map((opcion, index) => {
              return (
                <div key={shortid.generate()} className={"rounded-full  "}>
                  <button
                    onClick={(event, props) => {
                      cambiarVisibilidad(event, props);
                    }}
                  >
                    <span className="md:text-sm text-xs  p-2 min-w-full cardCheck px-5 border-blue-200 bg-blue-50">
                       {opcion}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const InputCompletarTexto = (props) => {
  const volverALaNormalidad = (event) => {
    let opciones = Array.from(props.opcionesRef.current.children);
    opciones.forEach((element, index) => {
      if (props.opt[index] === event.target.innerText) {
        element.firstChild.classList.remove("invisible");
        element.classList.remove("bg-gray-400");
        event.target.classList.remove("bg-blue-50");
        event.target.classList.remove("shadow-lg");
        event.target.classList.remove("border-blue-200");
        event.target.innerText = "Waiting answer...";
      }
    });
  };

  return (
    <button
      className={
        "shadow appearance-none border rounded w-full h-13 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs opt-1"
      }
      onClick={volverALaNormalidad}
    >
      Waiting answer...
    </button>
  );
};

const JuegoCompletarTexto = (props) => {
  return (
    <div className="grid grid-cols-2 text-justify items-center  my-2 ">
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego === "string") {
              
            return (
              <div
                key={shortid.generate()}
              >
                  {/* <ViewImage img={juego}/> */}
                {props.type === "emparejar_img" && <ViewImage img={juego} />}
                {props.type == "emparejar" && <h2 className=
                  "mx-2 text-justify w-auto text-xs sm:text-sm text-xs"
                 >{ juego }</h2>}
              </div>
            );
          }
        })}
      </div>
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego !== "string") {
            return juego;
          }
        })}
      </div>
    </div>
  );
};

export default Emparejar;
