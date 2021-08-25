import React from "react";
import { useState, useRef, createRef } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
export const Drag = () => {
  const initialTasks = [
    {
      id: "1",
      text: "Library",
    },
    {
      id: "2",
      text: "Stadium",
    },
    {
      id: "3",
      text: "Airplane",
    },
    {
      id: "4",
      text: "Market",
    },
    {
      id: "4",
      text: "Atm",
    },    
    {
      id: "4",
      text: "Museum",
    },    
  ];
  
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const imagen1 = useRef();
  let datos = {
    total_completado:80,
    ejercicios:[
      {
        id:1,
        item: ["I read books in the",'____________'],
        respuesta: "library"
      },
      {
        id:2,
        item: ["I go to the",'____________'],
        respuesta: "museum"
      },{
        id:3,
        item: ["I have launch in a",'____________'],
        respuesta: "airplane"
      },
      {
        id:4,
        item: ["I buy food in the",'____________'],
        respuesta: "market"
      },
      {
        id:5,
        item: ["I play football at the",'____________'],
        respuesta: "stadium"
      },
      {
        id:6,
        item: ["I get money from the bank in the",'____________'],
        respuesta: "atm"
      },
    ],
  };

  const imagesRef = useRef(
    [...Array(datos.ejercicios.length)].map(() => createRef())
  );

  const [marcado, setMarcado] = useState(false);
  const marcar = (imagenRef) => {
    try {
      console.log(imagenRef);
      //borrar todas las otras referencias
      imagesRef.current.forEach((ref) => {
        ref.current.classList.contains("activado") &&
          ref.current.classList.remove("activado");
        imagenRef.current.setAttribute("aria-checked", "false");
      });

      imagenRef.current.classList.toggle("activado");
      imagenRef.current.setAttribute("aria-checked", "true");
    } catch (error) {
      console.log(error);
    }
  };

  const [tasks, setTasks] = useState(initialTasks);
  return (
    <DragDropContext >
    <div className="container m-auto p-auto w-10/12">
      <div className="flex justify-between py-5">
        <h2>
          <span>
            <p className="text-lg font-bold	">Find the place for this activities</p>
          </span>
        </h2>
        <div>
          <button>
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
      <div
        className="flex flex-wrap flex-col gap-2 mb-4"
        aria-label="choice"
        role="radiogroup"
      >
        {datos.ejercicios.map((ejercicio, index) => {
return(<GrammarImage2 key={index} src={'https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703'} alt={"agua"} nombre={"agua"} marcar={marcar} myref={imagesRef.current[index]} data={datos.ejercicios[index]}/>)
        })}
      </div>      
      <div
        className="flex flex-wrap items-center justify-center	gap-2 mb-4"
        aria-label="choice"
        role="radiogroup"
      >
        <Droppable droppableId="tasks">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="task-item flex flex-col flex-wrap cardCheck m-2"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>

      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mb-4">
          <button
            className="btn-exercise"
            disabled={false}
            onClick={() => console.log("hola")}
          >
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
    </DragDropContext>
  );
  
};

const GrammarImage = (props) => {
  return(
    <div  style={{height: "50px"}} className="flex flex-col cardCheck w-1/4 flex-wrap" aria-checked="false" role="radio" tabIndex="-1" ref={props.myref}>
      <button        onClick={()=>{
        props.marcar(props.myref);

      }}>
    <p className="text-lg	 font-medium	">{props.data.respuesta}</p>
      </button>
  </div>    
  )

};

const GrammarImage2 = (props) => {
  return(
    <div  style={{height: "50px"}} className="flex flex-col w-1/4 flex-wrap" aria-checked="false" role="radio" tabIndex="-1" ref={props.myref}>
    <p className="text-lg	 font-medium mr-2n">{props.data.item[0]}</p>
    <input type={"text"} className="border"></input>
  </div>    
  )

};