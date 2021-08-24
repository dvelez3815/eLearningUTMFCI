import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import i_writting from '../../assets/icons/teacher.png'
import { useRef, createRef } from "react";


export default function EModule(props){
    let data ={
        actividades: [
            {},{},{},{},{}
        ],
    }
      
    const activityRef = useRef([...Array(data.actividades.length)].map(() => createRef()));
    
    const handlerActivity = (activity) =>{
        activityRef.current.forEach((ref, index) => {
            if(ref.current.children.length>2){
                ref.current.removeChild(ref.current.children[2]);
            }
            
        });

        let $modal = document.createElement('div');
        $modal.className = 'modalCard';
        $modal.innerHTML = '<p>Lección 1/5</p><nav><button>APUNTES</button><button>EMPEZAR</button></nav>';
        activity.current.insertAdjacentElement('beforeend', $modal);
        

    }

    return(
        <>
        <div>
        <ModuleProgress moduleName="Modulo 1" percent={props.percent}></ModuleProgress>
        <div className="flex flex-row">
        {data.actividades.map((actividad, index) => {
            if(index===0)
                return(<Activity img={i_writting} percent={props.percent} name={"Gramática"} colspan={'col-span-1 col-start-2 sm:col-start-1 xsm:col-span-2'} handlerActivity={handlerActivity} myref ={activityRef.current[index]}/>)
            if(index===1)
                return (<Activity img={i_writting} percent={props.percent} name={"Vocabulario"} colspan={'col-span-1 col-start-4 sm:col-start-3 sm:col-span-2'} handlerActivity={handlerActivity} myref ={activityRef.current[index]}/>)
            if(index===2)
                return(<Activity img={i_writting} percent={props.percent} name={"Escritura"} colspan={'col-span-1 col-start-2 sm:col-start-5 sm:col-span-2'} handlerActivity={handlerActivity} myref ={activityRef.current[index]}/>)
            if(index===3)
                return(<Activity img={i_writting} percent={props.percent} name={"Escucha"} colspan={'col-span-1 col-start-4 sm:col-start-2 sm:col-span-2'} handlerActivity={handlerActivity} myref ={activityRef.current[index]}/>)
             if(index===4)
                return(<Activity img={i_writting} percent={props.percent} name={"Pronunciación"} colspan={'col-span-1 col-start-2 sm:col-start-4 sm:col-span-2'} handlerActivity={handlerActivity} myref ={activityRef.current[index]}/>)
        })}
        
        </div>
        </div>
        </>
    )
}