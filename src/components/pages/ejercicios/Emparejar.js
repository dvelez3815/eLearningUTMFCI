import React, { createRef, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';

export const Emparejar = () => {

  const history = useHistory();

    let datos = {
        total_completado:80,
        ejercicios:[
          {
            id:1,
            item: ["Please hold the line",'____________'],
            respuesta: "library"
          },
          {
            id:2,
            item: ["Please you hold the line",'____________'],
            respuesta: "pizza"
          },{
            id:3,
            item: ["Please to hold the line",'____________'],
            respuesta: "bank"
          },
          {
            id:4,
            item: ["Please hold your the line",'____________'],
            respuesta: "library"
          },
        ],
      };
   
      
    const imagesRef = useRef([...Array(datos.ejercicios.length)].map(() => createRef()));

  const [marcado, setMarcado] = useState(false);
  const marcar = (imagenRef)=>{
    try {
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
        <div className="container m-auto p-auto w-10/12 flex flex-col h-screen justify-between ">
          <div className="flex justify-between py-5">
            <h2>
              <span>
                <p className="text-lg font-bold	">¿Cuál oración es la correcta?</p>
              </span>
            </h2>
            <div>
              <button onClick={()=>history.push('/inicio')}>
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
          <div className="flex flex-col flex-wrap gap-2 mb-4" aria-label="choice" role="radiogroup">
          {datos.ejercicios.map((ejercicio, index)=>{
          return(<GrammarImage key={index} src={'https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703'} alt={"agua"} nombre={"agua"} marcar={marcar} myref={imagesRef.current[index]} data={datos.ejercicios[index]}/>)
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
            <button className="bg-green-500 hover:bg-green-700 btn-exercise">
              <span>
                <p>comprobar</p>
              </span>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <div className="order-last">
              <p>COMPLETADO: {100}</p>
            </div>
          </div>
    
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 h-4 border">
            <div
              style={{ width: "100%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
            ></div>
          </div>
        </div>
      );
}

const GrammarImage = (props)=>{
    console.log(props);
    return(
      <div  style={{height: "70px"}} className="flex flex-col w-1/4 center-items justify-center flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" ref={props.myref}>
        <button        onClick={()=>{
          props.marcar(props.myref);
  
        }}>
      <p className="text-lg	 font-medium	">{props.data.item[0]}</p>
        </button>
    </div>    
    )
  }
  