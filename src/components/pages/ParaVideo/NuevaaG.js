import "../../pages/ejercicios/CheckExercise.css";
import { useState, useRef,createRef } from "react";
import AlertError, { mostrarError } from "../../Alert/Error";
import AlertSuccess from "../../Alert/Exito";
import { ErrorData } from "../../Alert/Mensajes";
import { mostrarAlertaError,mostrarAlertaExito } from "../../Alert/Alerts";
import { useHistory } from 'react-router-dom';


const NuevaaG = (props) => {
    const history = useHistory();

  const imagen1 = useRef();

  let datos = {
    total_completado:80,
    ejercicios:[
      {
        nombre:"salad",
        imagen: "https://d2pur3iezf4d1j.cloudfront.net/images/6fd84b8a838c43c4a84b44b08b10177e",
      },{
        nombre:"menu",
        imagen: "https://d2pur3iezf4d1j.cloudfront.net/images/016b7b168e175683396980bdcf7cf0e0",
      },{
        nombre:"soup",
        imagen: "https://d2pur3iezf4d1j.cloudfront.net/images/1e654049e7a5e2970b784b433fc2c73a",
      },
      {
        nombre:"passport",
        imagen: "https://d2pur3iezf4d1j.cloudfront.net/images/e7b0a73db486929d38f60265f0813343",
      }
    ],
  };
  const imagesRef = useRef([...Array(datos.ejercicios.length)].map(() => createRef()));

  const [marcado, setMarcado] = useState(false);
  const marcar = (imagenRef)=>{
    try {
      
      console.log(imagenRef);
      //borrar todas las otras referencias
      (imagesRef.current.forEach(ref => {
        (ref.current.classList.contains("activado"))&&ref.current.classList.remove("activado");
        (imagenRef.current.setAttribute("aria-checked", "false"));
      }))

      imagenRef.current.classList.toggle("activado");
      (imagenRef.current.setAttribute("aria-checked", "true"));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container m-auto p-auto w-10/12">
      <div className="flex justify-between py-5">
        <h2>
          <span>
            <p className="text-lg font-bold	">¿Cuál de estos es agua?</p>
          </span>
        </h2>
        <div>
          <button onClick={()=>history.push('/dashboard')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center	gap-2 mb-4" aria-label="choice" role="radiogroup">
        {datos.ejercicios.map((ejercicio, index)=>{
          return(<GrammarImage key={index} src={ejercicio.imagen} alt={"agua"} nombre={ejercicio.nombre} marcar={marcar} myref={imagesRef.current[index]}/>)
        }
        )}
      </div>

      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mb-4">
          <button className="btn-exercise" disabled={false} onClick={()=>console.log("hola")}>
            <span>
              <p>saltar</p>
            </span>
          </button>
        </div>
        <div className="mb-4">
        <button className="bg-green-500 hover:bg-green-700 btn-exercise" onClick={()=>mostrarAlertaError()}>
          <span>
            <p>comprobar</p>
          </span>
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <div className="order-last">
          <p>COMPLETADO: {`${datos.total_completado}%`}</p>
        </div>
      </div>

      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 h-4 border">
        <div
          style={{ width: `${datos.total_completado}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        ></div>
      </div>
    </div>
  );
};


const GrammarImage = (props)=>{
  return(
    <div className="flex flex-col w-1/4 flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" ref={props.myref}>
      <button>
      <img 
      src={props.src}
      alt={props.alt}
      onClick={()=>{
        props.marcar(props.myref);
      }}
    />
    <p className="text-sm font-medium	">{props.nombre}</p>
      </button>
  </div>    
  )
}

export default NuevaaG;
