import "./Activity.css";

import React, { useEffect, useRef} from "react";
import { getProgressColor } from "../../helpers/indexFuntions";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { mostrarContenido } from "../Alert/Alerts";
import {Link} from "react-router-dom";


export default function Activity(props) {
  

  let circlePercent = useRef();
  let bcirclePercent = useRef();

  

  useEffect(
    
    (e) => {
      //console.log('PROPIEDAD',props.info)
      if(circlePercent.current){
        circlePercent.current.style.height = `${props.percent}%`;
        circlePercent.current.style.backgroundColor = getProgressColor(
          props.percent
        );
  
      }      
    },
    [props.percent]
    
  );
  React.useEffect(() => {

  }, []); //cuando haya un cambio de pregunta se actualiza el estado del componente.

 

  const getExercises = async(task_id, ruta) => {

    let Info = props.task.filter(x => x._id === task_id)
    let explicacion = String(Info[0].explanation)
    let objetivo = String(Info[0].objetive.text)
    let topic_ = String(Info[0].topic.top)
    mostrarContenido(topic_,objetivo, explicacion, ruta )
    
}



  return (
    <Menu
      as="div"
      className={`relative inline-block tooltip pb-5`}
      ref={props.myref}
    >
      {(props.percent === 100)?
      <div>
          <Menu.Button  disabled={props.bloqueo}  className="inline-flex justify-center w-full  px-4 py-2 bg-red text-sm font-medium text-gray-700" /*disabled={props.percent===100?true:false}*/>
            <div
              className={props.percent !== 100?props.bloqueo?"bcircle ":"circle":"circle"}
            >
              <div className="bfill" ref={props.bloqueo?bcirclePercent:circlePercent}></div>
              <img
                src={props.img}
                alt="ActivityName"
                className="activity-img"
              ></img>
            </div>
          </Menu.Button>
      </div>
      :
      <div>
          <Menu.Button  disabled={props.bloqueo}  className="inline-flex justify-center w-full  px-4 py-2 bg-red text-sm font-medium text-gray-700" /*disabled={props.percent===100?true:false}*/>
            <div
              className={props.percent !== 100?props.bloqueo?"bcircle ":"circle":"circle"}
            >
              <div className="bfill" ref={props.bloqueo?bcirclePercent:circlePercent}></div>
              <img
                src={props.img}
                alt="ActivityName"
                className="activity-img"
              ></img>
            </div>
          </Menu.Button>
        
      </div>
      }
      
      <div className="circle-text">
        <h2 className="text-base font-bold capitalize">{props.name}</h2>
        <div>
          <h3 className={`${props.bloqueo?'tooltiptext ':'hidden'}`}>Activity blocked, must complete previous modules</h3>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items  className="origin-center absolute  mt-2 sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="p-2 text-left">
              <h2 className="text-center text-sm  mx-2 font-bold text-gray-500">
                Completed: {props.percent}% 
              </h2>
              <h2 className=" mx-2  font-bold text-gray-800">
                {props.percent === 100? <div className="sm:text-lg text-center">lessons completed</div>: <div className="text-center  "> TOPIC <p className="text-sm"> {(props.task.filter(x => x._id === props.taskid)[0].topic.top).toLowerCase()} </p></div>}
              </h2>
              
            </div>

            {(props.percent === 100)?
            <h1 className="hidden">k</h1>
            :
            <Menu.Item >
              {({ active }) => (
                <div className="px-2">
                  <button onClick={() => getExercises(props.taskid,props.ruta)} className="w-full rounded hover:bg-yellow-400  py-2 bg-yellow-300 font-black text-gray-600">
                      information
                    </button>
                </div>

              )}
            </Menu.Item>
            } 
            <Menu.Item    >
              {({ active }) => (
                  <div className="px-2">
                    <div className={props.percent === 100?"bg-yellow-500  my-2 hover:bg-gray-500 text-white font-bold  px-4 rounded":"bg-green-600  my-2 hover:bg-green-800 text-white font-bold  rounded"}>
                    <Link className={props.percent === 100?"block w-full  py-2 px-4 ":"block w-full h-full py-2 px-4 "}
                      to={props.percent === 100?props.rutaReview:props.ruta} 
                
                    >
                      {props.percent === 100?"review":"start"}
                    </Link>
                  </div>
                </div>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    
  );
}
