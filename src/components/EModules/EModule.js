import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import i_writting from "../../assets/icons/teacher.png";
import { useRef, createRef } from "react";

export default function EModule(props) {
  

  const activityRef = useRef(
    [...Array(props.actividades.length)].map(() => createRef())
  );

  const handlerActivity = (activity) => {
    /*  activityRef.current.forEach((ref, index) => {
            if(ref.current.children.length>2){
                ref.current.removeChild(ref.current.children[2]);
            }
            
        });

       console.log(activity);

        let $modal = document.createElement('div');
        $modal.className = 'modalCard';
        $modal.innerHTML = '<p>Lección 1/5</p><nav><button>APUNTES</button><button>EMPEZAR</button></nav>';
        activity.current.insertAdjacentElement('beforeend', $modal); */
  };

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
                  moduleName="Modulo 1"
                  percent={props.percent}
                  name={props.actividades[index].nombre}
                  colspan={
                    "col-span-1 col-start-2 sm:col-start-1 xsm:col-span-2"
                  }
                  ruta={props.actividades[index].ruta}
                  handlerActivity={handlerActivity}
                  myref={activityRef.current[index]}
                />
              );
          })}
        </div>
      </div>
    </>
  );
}
