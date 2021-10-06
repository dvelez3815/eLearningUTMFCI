import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import { useRef, createRef } from "react";

export default function EModule(props) {
  

  const activityRef = useRef(
    [...Array(props.actividades.length)].map(() => createRef())
  );


  return (
    <>
      <div>
        <ModuleProgress
          moduleName={props.nombre}
          percent={props.percent}
        ></ModuleProgress>
        <div className="flex flex-wrap justify-center">
          {props.actividades.map((actividad, index) => {
              return (
                <Activity
                  img={props.imagen}
                  moduleName="Module 1"
                  percent={props.percent}
                  name={props.actividades[index].nombre}
                  colspan={
                    "col-span-1 col-start-2 sm:col-start-1 xsm:col-span-2"
                  }
                  ruta={props.actividades[index].ruta}
                  myref={activityRef.current[index]}
                />
              );
          })}
        </div>
      </div>
    </>
  );
}
